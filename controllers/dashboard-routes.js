// Import necessary modules.
const router = require('express').Router(); 
const { Post, User, Comment } = require('../models');
const withAuth = require('../utils/auth');

// Route for the dashboard page.
router.get('/', withAuth, async (req, res) => {
  try {
    // Find all posts by the logged-in user.
    const postData = await Post.findAll({
      where: {
        user_id: req.session.userId,
      },
      include: [User],  // Include associated User data.
      order: [['createdAt', 'DESC']],  // Order by creation date in descending order.
    });

    // Get plain object versions of the post data.
    const posts = postData.map((post) => post.get({ plain: true }));

    // Render the 'dashboard' view with the post data and loggedIn status.
    res.render('partials/dashboard', {
      posts,
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    console.log(err);  // Log error to console.
    res.status(500).json(err);  // Respond with error.
  }
});

// Route for the new post page.
router.get('/new-post', withAuth, async (req, res) => {
  try {
    // Render the 'new-post' view with the loggedIn status.
    res.render('partials/new-post', {
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    res.status(500).json(err);  // Respond with error.
  }
});

// Route for the edit post page.
router.get('/edit-post/:id', withAuth, async (req, res) => {
  try {
    // Find a post with the specified ID.
    const postData = await Post.findByPk(req.params.id, {
      include: [
        {
          model: User,  // Include associated User data.
          attributes: ['username'],  // Only include the 'username' attribute.
        },
        {
          model: Comment,  // Include associated Comment data.
          include: [
            {
              model: User,  // Include associated User data.
              attributes: ['username'],  // Only include the 'username' attribute.
            },
          ],
        },
      ],
    });

    // Get a plain object version of the post data.
    const post = postData.get({ plain: true });

    // Render the 'edit-post' view with the post data and loggedIn status.
    res.render('partials/edit-post', { post, loggedIn: req.session.loggedIn });
  } catch (err) {
    console.log(err);  // Log error to console.
    res.status(500).json(err);  // Respond with error.
  }
});

// Export the router to be used in other parts of the application.
module.exports = router;
