const router = require('express').Router();
const { User, Post, Comment } = require('../models');
const withAuth = require('../utils/auth');

// Dashboard route
router.get('/', withAuth, async (req, res) => {
    try {
      const userData = await User.findByPk(req.session.userId, {
        attributes: { exclude: ['password'] },
        include: [{ model: Post }],
      });
  
      const user = userData.get({ plain: true });
  
      res.render('partials/dashboard', {
        user,
        loggedIn: req.session.loggedIn,
        homepage: false, // Add this line to pass the homepage variable
      });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  });
  
  router.get('/myposts', withAuth, async (req, res) => {
    try {
      const postData = await Post.findAll({
        where: {
          userId: req.session.userId
        },
        include: [
          {
            model: User,
            attributes: ['username'],
          },
          {
            model: Comment,
            include: [
              {
                model: User,
                attributes: ['username']
              }
            ]
          }
        ],
      });
  
      const posts = postData.map((post) => post.get({ plain: true }));
  
      res.render('partials/myposts', {
        posts,
        loggedIn: req.session.loggedIn,
      });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  });
  
module.exports = router;
