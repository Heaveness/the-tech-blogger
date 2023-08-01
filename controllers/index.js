const router = require('express').Router();
const homeRoutes = require('./homepage-routes');
const dashboardRoutes = require('./dashboard-routes');
const apiRoutes = require('./api/index');

router.use('/', homeRoutes);
router.use('/dashboard', dashboardRoutes);
router.use('/api', apiRoutes);

module.exports = router;
