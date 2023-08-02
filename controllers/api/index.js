// Import the necessary dependencies.
const router = require('express').Router();

// Import route modules.
const userRoutes = require('./user-routes');
const postRoutes = require('./post-routes');
const commentRoutes = require('./comment-routes');

// Set up route handlers.
router.use('/user', userRoutes);
router.use('/post', postRoutes);
router.use('/comment', commentRoutes);

// Export the router to be used in other parts of the application.
module.exports = router;
