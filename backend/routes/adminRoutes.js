const express = require("express");
const router = express.Router();

const {
  getAllUsers,
  processTransactionRequest,
  adjustTradeState,
} = require("../controllers/adminController");

// Get all registered users
router.get("/users", getAllUsers);

// Approve or reject deposits/withdrawals
router.put("/transactions/process", processTransactionRequest);

// Adjust or close trades
router.put("/trades/adjust", adjustTradeState);

module.exports = router;