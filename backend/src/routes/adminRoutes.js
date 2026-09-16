const express = require("express");
const router = express.Router();

const {
  getAllUsers,
  processTransactionRequest,
  adjustTradeState,
} = require("../controllers/adminController");

router.get("/users", getAllUsers);

router.put("/transactions/process", processTransactionRequest);

router.put("/trades/adjust", adjustTradeState);

module.exports = router;
