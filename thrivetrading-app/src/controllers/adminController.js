const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Get all registered user accounts
exports.getAllUsers = async (req, res) => {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        balance: true,
        createdAt: true,
      },
      orderBy: { createdAt: 'desc' },
    });
    return res.json({ status: 'success', data: users });
  } catch (error) {
    return res.status(500).json({ status: 'error', message: error.message });
  }
};

// Approve or Reject Pending Deposits / Withdrawals
exports.processTransactionRequest = async (req, res) => {
  const { transactionId, status } = req.body; // status: 'APPROVED' or 'REJECTED'

  if (!['APPROVED', 'REJECTED'].includes(status)) {
    return res.status(400).json({ status: 'error', message: 'Invalid status provided.' });
  }

  try {
    const result = await prisma.$transaction(async (tx) => {
      const transaction = await tx.transaction.findUnique({
        where: { id: transactionId },
      });

      if (!transaction || transaction.status !== 'PENDING') {
        throw new Error('Transaction not found or already processed.');
      }

      // Update status on the transaction record
      const updatedTx = await tx.transaction.update({
        where: { id: transactionId },
        data: { status },
      });

      // Credit balance if deposit approved; restore balance if withdrawal rejected
      if (status === 'APPROVED' && transaction.type === 'DEPOSIT') {
        await tx.user.update({
          where: { id: transaction.userId },
          data: { balance: { increment: transaction.amount } },
        });
      } else if (status === 'REJECTED' && transaction.type === 'WITHDRAWAL') {
        await tx.user.update({
          where: { id: transaction.userId },
          data: { balance: { increment: transaction.amount } },
        });
      }

      return updatedTx;
    });

    return res.json({ status: 'success', message: `Transaction ${status.toLowerCase()} successfully.`, data: result });
  } catch (error) {
    return res.status(400).json({ status: 'error', message: error.message });
  }
};

// Execute trade adjustments or close trades manually
exports.adjustTradeState = async (req, res) => {
  const { tradeId, status, profitLoss } = req.body;

  try {
    const updatedTrade = await prisma.$transaction(async (tx) => {
      const trade = await tx.trade.findUnique({ where: { id: tradeId } });
      if (!trade) throw new Error('Trade record not found.');

      const tradeResult = await tx.trade.update({
        where: { id: tradeId },
        data: { status, profitLoss: profitLoss !== undefined ? profitLoss : trade.profitLoss },
      });

      // Update user account balance when trade is closed
      if (status === 'CLOSED' && profitLoss) {
        await tx.user.update({
          where: { id: trade.userId },
          data: { balance: { increment: profitLoss } },
        });
      }

      return tradeResult;
    });

    return res.json({ status: 'success', message: 'Trade adjusted successfully.', data: updatedTrade });
  } catch (error) {
    return res.status(400).json({ status: 'error', message: error.message });
  }
};