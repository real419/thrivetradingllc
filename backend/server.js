const express = require("express");
const cors = require("cors");
const app = express();
const PORT = 5001;

app.use(cors());
app.use(express.json());

let trades = [
  { id: 1, symbol: "AAPL", side: "BUY", amount: 10, price: 185.50, userId: 1 }
];

app.get("/api/trades", (req, res) => {
  res.json(trades);
});

app.post("/api/trades", (req, res) => {
  const { symbol, side, amount, price, userId } = req.body;
  const newTrade = {
    id: trades.length + 1,
    symbol: symbol || "BTC",
    side: side || "BUY",
    amount: parseFloat(amount) || 1,
    price: parseFloat(price) || 100,
    userId: parseInt(userId) || 1
  };
  trades.unshift(newTrade);
  res.status(201).json(newTrade);
});

app.listen(PORT, () => {
  console.log(`Backend server active on http://localhost:${PORT}`);
});
