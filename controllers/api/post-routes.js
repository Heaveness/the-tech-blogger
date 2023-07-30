const router = require('express').Router();
const { Post, User, Comment } = require('../../models');
const withAuth = require('../../utils/auth');

// Create a new post
router.post('/', withAuth, async (req, res) => {
  try {
    const newPost = await Post.create({
      title: req.body.title,
      content: req.body.content,
      userId: req.session.userId,
    });

    res.status(200).json(newPost);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Update a post
router.put('/:id', withAuth, async (req, res) => {
  try {
    const updatedPost = await Post.update(
      {
        title: req.body.title,
        content: req.body.content,
      },
      {
        where: {
          id: req.params.id,
          userId: req.session.userId,
        },
      }
    );

    if (updatedPost[0] === 0) {
      res.status(404).json({ message: 'No post found with this id' });
      return;
    }

    res.status(200).json(updatedPost);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Delete a post
router.delete('/:id', withAuth, async (req, res) => {
  try {
    const deletedPost = await Post.destroy({
      where: {
        id: req.params.id,
        userId: req.session.userId,
      },
    });

    if (deletedPost === 0) {
      res.status(404).json({ message: 'No post found with this id' });
      return;
    }

    res.status(200).json(deletedPost);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;
