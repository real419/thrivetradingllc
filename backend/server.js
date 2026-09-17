const express = require("express");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors());
app.use(express.json());

// In-memory data stores for this deployment
let trades = [
  { id: 1, symbol: "AAPL", side: "BUY", amount: 10, price: 185.50, userId: 1 }
];

let users = [];

// --- AUTH ROUTES ---
app.post("/api/auth/register", (req, res) => {
  const { name, email, password } = req.body;
  
  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required." });
  }

  const existingUser = users.find(u => u.email === email);
  if (existingUser) {
    return res.status(400).json({ error: "User already registered." });
  }

  const newUser = { id: users.length + 1, name: name || "Trader", email, password };
  users.push(newUser);

  res.status(201).json({ 
    message: "User registered successfully", 
    user: { id: newUser.id, name: newUser.name, email: newUser.email } 
  });
});

app.post("/api/auth/login", (req, res) => {
  const { email, password } = req.body;

  const user = users.find(u => u.email === email && u.password === password);
  if (!user) {
    return res.status(401).json({ error: "Invalid email or password." });
  }

  res.json({
    token: "mock-jwt-token-" + user.id,
    user: { id: user.id, name: user.name, email: user.email }
  });
});

// --- TRADES ROUTES ---
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
  console.log(`Backend server active on port ${PORT}`);
});