// Import necessary modules.
const router = require('express').Router(); 
const homeRoutes = require('./homepage-routes'); 
const dashboardRoutes = require('./dashboard-routes');
const apiRoutes = require('./api/index');

// Use the imported routes.
router.use('/', homeRoutes);
router.use('/dashboard', dashboardRoutes);
router.use('/api', apiRoutes);

// Export the router to be used in other parts of the application.
module.exports = router;
