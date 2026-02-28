const express = require('express');
const router = express.Router();
const db = require('../configuracion/db');

router.get('/test', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT 1 as val');
    res.json({ message: 'Database connected successfully!', value: rows[0].val });
  } catch (error) {
    console.error('Database connection failed:', error);
    res.status(500).json({ error: 'Database connection failed', details: error.message });
  }
});

module.exports = router;
