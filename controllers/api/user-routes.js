// Import necessary modules.
const router = require('express').Router();
const { User, Post, Comment } = require('../../models');
const withAuth = require('../../utils/auth');
const { Op } = require('sequelize');

// Route to create a new user.
router.post('/', async (req, res) => {
  try {
    // Create a new user using the User model.
    const userData = await User.create(req.body);

    // Save the new user data in the session.
    req.session.save(() => {
      req.session.userId = userData.id;  // User ID.
      req.session.username = userData.username;  // User name.
      req.session.loggedIn = true;  // Logged in status.

      // Respond with the user data.
      res.status(200).json(userData);
    });
  } catch (err) {
    console.log(err);  // Log error to console.
    res.status(500).json(err);  // Respond with error.
  }
});

// Route for user login.
router.post('/login', async (req, res) => {
  try {
    // Find a user with the specified username or email.
    const userData = await User.findOne({ 
      where: { 
        [Op.or]: [
          { username: req.body.identifier },  // Username.
          { email: req.body.identifier },  // Email.
        ]
      } 
    });

    // If no user was found, respond with a 400 error.
    if (!userData) {
      res
        .status(400)
        .json({ message: 'Incorrect username or email, or password. Please try again.' });
      return;
    }

    // Check if the provided password is valid.
    const validPassword = await userData.checkPassword(req.body.password);

    // If the password is not valid, respond with a 400 error.
    if (!validPassword) {
      res
        .status(400)
        .json({ message: 'Incorrect username or email, or password. Please try again.' });
      return;
    }

    // Save the user data in the session.
    req.session.save(() => {
      req.session.userId = userData.id;  // User ID.
      req.session.username = userData.username;  // User name.
      req.session.loggedIn = true;  // Logged in status.

      // Respond with the user data and a success message.
      res.json({ user: userData, message: 'You are now logged in!' });
    });

  } catch (err) {
    console.log(err);  // Log error to console.
    res.status(500).json(err);  // Respond with error.
  }
});

// Route for user logout.
router.post('/logout', withAuth, (req, res) => {
  // If the user is logged in, destroy the session.
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      // Respond with a 204 status code.
      res.status(204).end();
    });
  } else {
    // If the user is not logged in, respond with a 404 status code.
    res.status(404).end();
  }
});

// Export the router to be used in other parts of the application.
module.exports = router;
