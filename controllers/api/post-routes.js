// Import necessary modules.
const router = require('express').Router();
const { Post, User, Comment } = require('../../models');
const withAuth = require('../../utils/auth');

// Route to create a new post.
router.post('/', withAuth, async (req, res) => {
  try {
    // Create a new post using the Post model.
    const newPost = await Post.create({
      title: req.body.title,  // Post title from request body.
      content: req.body.content,  // Post content from request body.
      user_id: req.session.userId,  // User ID from the session.
    });

    // Respond with the newly created post.
    res.status(200).json(newPost);
  } catch (err) {
    console.log(err);  // Log error to console.
    res.status(500).json(err);  // Respond with error.
  }
});

// Route to update a post.
router.put('/:id', withAuth, async (req, res) => {
  try {
    // Update a post with the specified ID.
    const updatedPost = await Post.update(
      {
        title: req.body.title,  // New post title from request body.
        content: req.body.content,  // New post content from request body.
      },
      {
        where: {
          id: req.params.id,  // Post ID from route parameter.
          user_id: req.session.userId,  // User ID from the session.
        },
      }
    );

    // If no post was updated, respond with a 404 error.
    if (updatedPost[0] === 0) {
      res.status(404).json({ message: 'No post found with this id' });
      return;
    }

    // Respond with the updated post.
    res.status(200).json(updatedPost);
  } catch (err) {
    console.log(err);  // Log error to console.
    res.status(500).json(err);  // Respond with error.
  }
});

// Route to get a post by ID.
router.get('/:id', async (req, res) => {
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

    // Render the 'single-post' view with the post data and loggedIn status.
    res.render('partials/single-post', { post, loggedIn: req.session.loggedIn });
  } catch (err) {
    console.log(err);  // Log error to console.
    res.status(500).json(err);  // Respond with error.
  }
});

// Route to delete a post.
router.delete('/:id', withAuth, async (req, res) => {
  try {
    // Delete a post with the specified ID.
    const deletedPost = await Post.destroy({
      where: {
        id: req.params.id,  // Post ID from route parameter.
        user_id: req.session.userId,  // User ID from the session.
      },
    });

    // If no post was deleted, respond with a 404 error.
    if (deletedPost === 0) {
      res.status(404).json({ message: 'No post found with this id' });
      return;
    }

    // Respond with the deleted post.
    res.status(200).json(deletedPost);
  } catch (err) {
    console.log(err);  // Log error to console.
    res.status(500).json(err);  // Respond with error.
  }
});

// Route to create a new post.
router.post('/post', withAuth, async (req, res) => {
  try {
    // Create a new post using the Post model.
    const postData = await Post.create({
      title: req.body.title,  // Post title from request body.
      content: req.body.content,  // Post content from request body.
      user_id: req.session.user_id,  // User ID from the session.
    });

    // Respond with the newly created post.
    res.status(200).json(postData);
  } catch (err) {
    res.status(400).json(err);  // Respond with error.
  }
});

// Export the router to be used in other parts of the application.
module.exports = router;
