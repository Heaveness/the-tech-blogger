const router = require('express').Router();
const homeRoutes = require('./homepage-routes');
const dashboardRoutes = require('./dashboard-routes');
const apiRoutes = require('./api/index');

router.use('/api', apiRoutes);
router.use('/', homeRoutes);
router.use('/dashboard', dashboardRoutes);

module.exports = router;
