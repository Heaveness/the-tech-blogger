// Import necessary modules.
const router = require('express').Router();
const { Post, User, Comment } = require('../models');

// Route for the homepage.
router.get('/', async (req, res) => {
    try {
      // Fetch all posts.
      const postData = await Post.findAll({
        include: [
          {
            model: User,  // Include associated User data.
            attributes: ['username'],  // Only include the 'username' attribute.
          },
        ],
      });

      // Get a plain object version of the post data.
      const posts = postData.map((post) => post.get({ plain: true }));

      // Render the 'homepage' view with the post data, loggedIn status, and homepage indicator.
      res.render('partials/homepage', {
        posts,
        loggedIn: req.session.loggedIn,
        homepage: true, 
      });
    } catch (err) {
      console.log(err);  // Log error to console.
      res.status(500).json(err);  // Respond with error.
    }
  });

// Route for the login page.
router.get('/login', (req, res) => {
  // If the user is already logged in, redirect to the homepage.
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }

  // Otherwise, render the 'login' view.
  res.render('partials/login');
});

// Route for the logout functionality.
router.get('/logout', (req, res) => {
  // If the user is logged in, destroy the session and redirect to the homepage.
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.redirect('/');
    });
  } else {
    // If the user is not logged in, respond with a 404 status code.
    res.status(404).end();
  }
});

// Route for the signup page.
router.get('/signup', (req, res) => {
  // If the user is already logged in, redirect to the dashboard.
  if (req.session.loggedIn) {
    res.redirect('/dashboard');
    return;
  }
  // Otherwise, render the 'signup' view.
  res.render('partials/signup');
});

// Route for the single post page.
router.get('/post/:id', async (req, res) => {
  try {
    // Fetch a post with the specified ID.
    const postData = await Post.findByPk(req.params.id, {
      include: [
        {
          model: Comment,  // Include associated Comment data.
          include: [
            {
              model: User,  // Include associated User data.
              attributes: ['username'],  // Only include the 'username' attribute.
            },
          ],
        },
        {
          model: User,  // Include associated User data.
          attributes: ['username'],  // Only include the 'username' attribute.
        },
      ],
    });

    // If no post was found with the specified ID, respond with a 404 status code.
    if (!postData) {
      res.status(404).json({ message: 'No post found with this id!' });
      return;
    }

    // Get a plain object version of the post data.
    const post = postData.get({ plain: true });

    // Render the 'single-post' view with the post data and loggedIn status.
    res.render('partials/single-post', {
      post,
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    console.log(err);  // Log error to console.
    res.status(500).json(err);  // Respond with error.
  }
});

// Export the router to be used in other parts of the application.
module.exports = router;
