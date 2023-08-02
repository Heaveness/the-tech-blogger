// Import necessary modules.
const router = require('express').Router();
const { Comment } = require('../../models');
const withAuth = require('../../utils/auth');

// Create a new comment.
router.post('/', withAuth, async (req, res) => {
  try {
    // Create a new comment using the Comment model.
    const newComment = await Comment.create({
      content: req.body.content,  // Comment content from request body.
      user_id: req.session.userId,  // User ID from the session.
      post_id: req.body.postId,  // Post ID from request body.
    });

    // Respond with the newly created comment.
    res.status(200).json(newComment);
  } catch (err) {
    console.log(err);  // Log error to console.
    res.status(500).json(err);  // Respond with error.
  }
});

// Route to delete a comment.
router.delete('/:id', withAuth, async (req, res) => {
  try {
    // Attempt to delete a comment with the specified ID.
    const deletedComment = await Comment.destroy({
      where: {
        id: req.params.id,  // Comment ID from route parameter.
        user_id: req.session.userId,  // User ID from the session.
      },
    });

    if (!deletedComment) {
      // If no comment was found, respond with a 404 error.
      res.status(404).json({ message: 'No comment found with this id!' });
      return;
    }

    // Respond with the deleted comment.
    res.status(200).json(deletedComment);
  } catch (err) {
    res.status(500).json(err);  // Respond with error.
  }
});

// Export the router to be used in other parts of the application.
module.exports = router;
