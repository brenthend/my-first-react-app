// server.js
import express from 'express';
import sqlite3 from 'sqlite3';
import cors from 'cors';

const app = express();
const db = new sqlite3.Database('./my-first-db.db');

app.use(cors()); // allow React dev server to access this API

app.get('/api/groceries', (req, res) => {
  db.all('SELECT * FROM grocery_item', [], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(rows);
  });
});

app.get('/api/groceries/:id', (req, res) => {
  const id = req.params.id;
  db.get('SELECT * FROM grocery_item WHERE id = ?', [id], (err, row) => {
    if (err) {
      console.error('Error fetching item by ID:', err);
      return res.status(500).json({ error: err.message });
    }
    if (!row) {
      return res.status(404).json({ error: 'Item not found' });
    }
    res.json({ ...row, test: '✅ server auto-updated!' });
  });
});

app.get('/api/hardware', (req, res) => {
  db.all('SELECT * FROM hardware_item', [], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(rows);
  });
});

app.get('/api/categories', (req, res) => {
  db.all('SELECT * FROM product_category', [], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(rows);
  });
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`🚀 API server listening at http://localhost:${PORT}`);
});
