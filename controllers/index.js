const router = require('express').Router();
const homeRoutes = require('./homepage-routes');
const dashboardRoutes = require('./dashboard-routes');

router.use('/', homeRoutes);
router.use('/dashboard', dashboardRoutes);

module.exports = router;
