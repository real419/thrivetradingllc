process.on('uncaughtException', (err) => {
  console.error('CRITICAL UNCAUGHT EXCEPTION:', err);
});
process.on('unhandledRejection', (reason, promise) => {
  console.error('CRITICAL UNHANDLED REJECTION:', reason);
});

import express from "express";
import cors from "cors";
import bcrypt from "bcryptjs";
import prisma from "./db.js";

const app = express();
const PORT = process.env.PORT || 5001;

// Updated CORS configuration to support both local development and live Netlify frontend
app.use(cors({
  origin: true,
  credentials: true
}));
app.use(express.json());

// Request Logger: Skips spamming background GET polls to keep terminal clean
app.use((req, res, next) => {
  if (!req.url.includes('/api/users') && !req.url.includes('/api/trades')) {
    console.log(`📥 Incoming Request: ${req.method} ${req.url}`, req.body);
  }
  next();
});

app.get("/", (req, res) => {
  res.send("Thrivetradingllc Express Prisma Backend Active");
});

// GET Trades
app.get("/api/trades", async (req, res) => {
  const { userId } = req.query;

  try {
    let whereClause = {};

    if (userId && userId !== "undefined" && userId !== "null") {
      if (!isNaN(userId)) {
        whereClause = { userId: parseInt(userId) };
      } else {
        const user = await prisma.user.findUnique({
          where: { email: userId.toLowerCase() }
        });
        if (user) {
          whereClause = { userId: user.id };
        }
      }
    }

    const trades = await prisma.trade.findMany({
      where: whereClause,
      orderBy: { createdAt: "desc" }
    });
    res.status(200).json(trades);
  } catch (error) {
    console.error("Fetch trades error:", error);
    res.status(200).json([]);
  }
});

// POST Trades
app.post("/api/trades", async (req, res) => {
  const { symbol, side, amount, price, userId } = req.body;
  if (!symbol || !side || !amount || !price) {
    return res.status(400).json({ error: "Missing trade parameters" });
  }

  try {
    let targetUserId = parseInt(userId);

    if (isNaN(targetUserId) && typeof userId === "string") {
      const user = await prisma.user.findUnique({
        where: { email: userId.toLowerCase() }
      });
      if (user) {
        targetUserId = user.id;
      }
    }

    if (!targetUserId || isNaN(targetUserId)) {
      return res.status(400).json({ error: "Invalid or missing userId" });
    }

    const newTrade = await prisma.trade.create({
      data: {
        symbol: symbol.toUpperCase(),
        side,
        amount: parseFloat(amount),
        price: parseFloat(price),
        pnl: 0.00,
        userId: targetUserId,
        status: "OPEN"
      }
    });
    res.status(201).json({ message: "Trade executed successfully", trade: newTrade });
  } catch (error) {
    console.error("Execute trade error:", error);
    res.status(500).json({ error: "Failed to execute trade" });
  }
});

// Admin Auth
app.post("/api/admin/login", (req, res) => {
  const { email, password } = req.body;
  if (email === "admin@example.com" && password === "admin123") {
    return res.status(200).json({ success: true, token: "admin-session-token-xyz" });
  }
  return res.status(401).json({ success: false, error: "Invalid admin credentials" });
});

// User Registration - EXPOSED ERROR HANDLING
app.post("/api/register", async (req, res) => {
  const { name, email, password } = req.body;
  if (!email || !password || !name) {
    return res.status(400).json({ error: "Name, email, and password are required." });
  }

  try {
    const existingUser = await prisma.user.findUnique({
      where: { email: email.toLowerCase() }
    });

    if (existingUser) {
      return res.status(400).json({ error: "An account with this email already exists." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await prisma.user.create({
      data: {
        name,
        email: email.toLowerCase(),
        password: hashedPassword,
        tier: "Tier 1",
        status: "Pending",
        balance: 0.00,
        profit: 0.00,
        grandTotal: 0.00,
        equity: 0.00,
        freeMargin: 0.00,
        unrealizedPnL: 0.00
      }
    });

    res.status(201).json({ message: "Registration successful.", user: newUser });
  } catch (error) {
    console.error("🔥 REGISTRATION CRASH ERROR:", error);
    
    return res.status(500).json({ 
      error: error.message || "Database execution failed", 
      code: error.code || "UNKNOWN",
      meta: error.meta || {}
    });
  }
});

// User Login
app.post("/api/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required." });
  }

  try {
    const user = await prisma.user.findFirst({
      where: {
        email: { equals: email.toLowerCase(), mode: "insensitive" }
      }
    });

    if (!user) {
      return res.status(401).json({ error: "Invalid email or password." });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ error: "Invalid email or password." });
    }

    res.status(200).json({
      message: "Login successful",
      token: "active-auth-token-session",
      user
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ error: "Login failed" });
  }
});

// Get User Profile
app.get("/api/user/:id", async (req, res) => {
  const paramId = req.params.id;

  try {
    let user;
    if (!isNaN(paramId)) {
      user = await prisma.user.findUnique({ where: { id: parseInt(paramId) } });
    } else {
      user = await prisma.user.findUnique({ where: { email: paramId.toLowerCase() } });
    }

    if (!user) return res.status(404).json({ error: "User not found" });

    res.status(200).json(user);
  } catch (error) {
    console.error("Get user error:", error);
    res.status(200).json({ error: "Error retrieving user" });
  }
});

// Get All Users for Admin Panel
app.get("/api/users", async (req, res) => {
  try {
    const users = await prisma.user.findMany({ orderBy: { id: "asc" } });
    res.status(200).json(users);
  } catch (error) {
    console.error("Fetch users error:", error);
    res.status(500).json({ error: "Failed to fetch users" });
  }
});

// Admin Update User Capital, Status & Details
app.put("/api/admin/users/:id", async (req, res) => {
  const paramId = req.params.id;
  const { balance, profit, grandTotal, status, tier, equity } = req.body;

  try {
    let userToUpdate;
    if (!isNaN(paramId)) {
      userToUpdate = await prisma.user.findUnique({ where: { id: parseInt(paramId) } });
    } else {
      userToUpdate = await prisma.user.findUnique({ where: { email: paramId.toLowerCase() } });
    }

    if (!userToUpdate) {
      return res.status(404).json({ error: "User not found" });
    }

    const newBalance = balance !== undefined ? parseFloat(balance) : userToUpdate.balance;
    const newProfit = profit !== undefined ? parseFloat(profit) : userToUpdate.profit;
    const calculatedGrandTotal = grandTotal !== undefined ? parseFloat(grandTotal) : (newBalance + newProfit);
    const newEquity = equity !== undefined ? parseFloat(equity) : calculatedGrandTotal;

    const updatedUser = await prisma.user.update({
      where: { id: userToUpdate.id },
      data: {
        balance: newBalance,
        profit: newProfit,
        grandTotal: calculatedGrandTotal,
        equity: newEquity,
        freeMargin: newEquity,
        ...(status && { status }),
        ...(tier && { tier })
      }
    });

    res.status(200).json({ message: "User updated successfully", user: updatedUser });
  } catch (error) {
    console.error("Update user error:", error);
    res.status(500).json({ error: "Failed to update user in database" });
  }
});

app.listen(PORT, () => {
  console.log(`Prisma Express Backend active on http://localhost:${PORT}`);
});