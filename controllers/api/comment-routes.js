const router = require('express').Router();
const { Comment } = require('../../models');
const withAuth = require('../../utils/auth');

// Create a new comment
router.post('/', withAuth, async (req, res) => {
  try {
    const newComment = await Comment.create({
      comment: req.body.comment,
      userId: req.session.userId,
      postId: req.body.postId,
    });

    res.status(200).json(newComment);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;


