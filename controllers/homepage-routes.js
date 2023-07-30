const router = require('express').Router();
const { Post, User, Comment } = require('../models');

// Homepage route
router.get('/', async (req, res) => {
    try {
      const postData = await Post.findAll({
        include: [
          {
            model: User,
            attributes: ['username'],
          },
        ],
      });
  
      const posts = postData.map((post) => post.get({ plain: true }));
  
      res.render('partials/homepage', {
        posts,
        loggedIn: req.session.loggedIn,
        homepage: true, // Add this line to pass the homepage variable
      });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  });
  

// Login route
router.get('/login', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }

  res.render('partials/login');
});

// Logout route
router.get('/logout', (req, res) => {
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.redirect('/');
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;
