require('dotenv').config();
const express = require('express');
const cors = require('cors');

const authRoutes = require('./src/routes/authRoutes');
const adminRoutes = require('./src/routes/adminRoutes'); // Add route import

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// API Endpoints
app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes); // Mount admin routes

app.get('/health', (req, res) => {
  res.json({ status: 'ok', message: 'Thrivetradingllc API running smoothly' });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});