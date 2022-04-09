const router = require('express').Router();
const daoController = require('../controllers/daoController');
const { isAdmin } = require('../middleware/middleware');

router.get('/addDaosToDatabase', isAdmin, daoController.addDaosToDatabase);
router.get(
  '/calcTreasury/:contract',
  isAdmin,
  daoController.calcTreasuryOvertime
);

router.get('/calcTreasuryAll', isAdmin, daoController.calcTreasuryOvertimeAll);

router.get('/daoOverviews', daoController.getDaos);
router.post('/upvote', daoController.upvoteDao);
router.get('/:contract', daoController.daoDetail);

module.exports = router;
