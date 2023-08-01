const router = require('express').Router();
const { User, Post, Comment } = require('../../models');
const withAuth = require('../../utils/auth');
const { Op } = require('sequelize');

// Create a new user
router.post('/', async (req, res) => {
  try {
    const userData = await User.create(req.body);

    req.session.save(() => {
      req.session.userId = userData.id;
      req.session.username = userData.username;
      req.session.loggedIn = true;

      res.status(200).json(userData);
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// User login
router.post('/login', async (req, res) => {
  try {
    const userData = await User.findOne({ 
      where: { 
        [Op.or]: [
          { username: req.body.identifier },
          { email: req.body.identifier },
        ]
      } 
    });

    if (!userData) {
      res
        .status(400)
        .json({ message: 'Incorrect username or email, or password. Please try again.' });
      return;
    }

    const validPassword = await userData.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: 'Incorrect username or email, or password. Please try again.' });
      return;
    }

    req.session.save(() => {
      req.session.userId = userData.id;
      req.session.username = userData.username;
      req.session.loggedIn = true;

      res.json({ user: userData, message: 'You are now logged in!' });
    });

  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});


// User logout
router.post('/logout', withAuth, (req, res) => {
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;