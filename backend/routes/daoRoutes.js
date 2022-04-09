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

// test routes
router.get(
  '/snap/:contract/proposals',
  isAdmin,
  daoController.getProposalsSnap
);
router.get('/snap/:proposal/votes', isAdmin, daoController.getVotesSnap);
router.get(
  '/snap/:contract/proposalsAndVotes',
  isAdmin,
  daoController.getProposalsAndVotesSnap
);

router.get('/:contract/proposals', daoController.getProposals);
router.get('/:proposal/votes', daoController.getVotes);
router.get('/:contract/proposalsAndVotes', daoController.getProposalsAndVotes);

// delete these
router.get('/votes/all', isAdmin, daoController.getAllVotes);
router.get('/proposals/all', isAdmin, daoController.getAllProposals);

module.exports = router;
