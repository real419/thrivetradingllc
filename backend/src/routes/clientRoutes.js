const express = require("express");
const router = express.Router();

const {
  getAccountSummary,
  requestTransaction,
  executeTrade,
} = require("../controllers/clientController");

const { authenticateToken } = require("../middleware/auth");

router.get("/account", authenticateToken, getAccountSummary);

router.post("/transactions", authenticateToken, requestTransaction);

router.post("/trades", authenticateToken, executeTrade);

module.exports = router;
