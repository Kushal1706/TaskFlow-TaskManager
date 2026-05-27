const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

require('dotenv').config();

const app = express();

// ─── CORS ─────────────────────────────────────────────
app.use(cors({
  origin: [
    'http://localhost:5173',
    'https://task-flow-taskmanager.vercel.app',
  ],
  credentials: true,
}));

app.use(express.json());

// ─── Routes ──────────────────────────────────────────
app.use('/api/auth', require('./routes/auth'));
app.use('/api/tasks', require('./routes/tasks'));

// ─── Health check ─────────────────────────────────────
app.get('/', (req, res) => {
  res.json({ message: 'Task Manager API is running ✅' });
});

// ─── Connect MongoDB + Start Server ───────────────────
const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log('✅ MongoDB connected');
    app.listen(PORT, () => {
      console.log(`✅ Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('❌ MongoDB connection failed:', err.message);
    process.exit(1);
  });