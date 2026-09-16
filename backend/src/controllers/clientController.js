const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Get account details and current balance
exports.getAccountSummary = async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.user.id },
      select: {
        id: true,
        name: true,
        email: true,
        balance: true,
        createdAt: true,
        trades: {
          orderBy: { createdAt: 'desc' },
          take: 5,
        },
        transactions: {
          orderBy: { createdAt: 'desc' },
          take: 5,
        },
      },
    });

    if (!user) {
      return res.status(404).json({ status: 'error', message: 'User account not found.' });
    }

    return res.json({ status: 'success', data: user });
  } catch (error) {
    return res.status(500).json({ status: 'error', message: error.message });
  }
};

// Submit a Deposit or Withdrawal request
exports.requestTransaction = async (req, res) => {
  const { amount, type } = req.body; // type: 'DEPOSIT' or 'WITHDRAWAL'

  if (!amount || amount <= 0) {
    return res.status(400).json({ status: 'error', message: 'Please provide a valid amount.' });
  }

  if (!['DEPOSIT', 'WITHDRAWAL'].includes(type)) {
    return res.status(400).json({ status: 'error', message: 'Invalid transaction type.' });
  }

  try {
    const result = await prisma.$transaction(async (tx) => {
      const user = await tx.user.findUnique({ where: { id: req.user.id } });

      // If withdrawal, check sufficient balance and lock funds
      if (type === 'WITHDRAWAL') {
        if (user.balance < amount) {
          throw new Error('Insufficient funds for this withdrawal.');
        }

        // Immediately deduct pending withdrawal balance
        await tx.user.update({
          where: { id: req.user.id },
          data: { balance: { decrement: amount } },
        });
      }

      // Create transaction record (Pending admin approval)
      const transaction = await tx.transaction.create({
        data: {
          userId: req.user.id,
          amount,
          type,
          status: 'PENDING',
        },
      });

      return transaction;
    });

    return res.status(201).json({
      status: 'success',
      message: `${type} request submitted and pending approval.`,
      data: result,
    });
  } catch (error) {
    return res.status(400).json({ status: 'error', message: error.message });
  }
};

// Execute a live trade order (BUY / SELL)
exports.executeTrade = async (req, res) => {
  const { symbol, type, amount, entryPrice } = req.body; // type: 'BUY' or 'SELL'

  if (!symbol || !amount || !entryPrice || amount <= 0) {
    return res.status(400).json({ status: 'error', message: 'Invalid trade order details.' });
  }

  try {
    const trade = await prisma.$transaction(async (tx) => {
      const user = await tx.user.findUnique({ where: { id: req.user.id } });

      if (user.balance < amount) {
        throw new Error('Insufficient balance to open this trade position.');
      }

      // Lock margin amount required for trade
      await tx.user.update({
        where: { id: req.user.id },
        data: { balance: { decrement: amount } },
      });

      // Record active trade position
      const newTrade = await tx.trade.create({
        data: {
          userId: req.user.id,
          symbol,
          type,
          amount,
          entryPrice,
          status: 'OPEN',
          profitLoss: 0.0,
        },
      });

      return newTrade;
    });

    return res.status(201).json({
      status: 'success',
      message: 'Trade position opened successfully.',
      data: trade,
    });
  } catch (error) {
    return res.status(400).json({ status: 'error', message: error.message });
  }
};