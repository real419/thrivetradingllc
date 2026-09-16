const express = require('express');
const router = express.Router();
const clientController = require('../controllers/clientController');
const { authenticateToken } = require('../middleware/authMiddleware');

// Protect all client trading routes behind JWT authentication
router.use(authenticateToken);

router.get('/account', clientController.getAccountSummary);
router.post('/transaction', clientController.requestTransaction);
router.post('/trade', clientController.executeTrade);

module.exports = router;