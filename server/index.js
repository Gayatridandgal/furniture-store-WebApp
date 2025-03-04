const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();

app.use(cors());
app.use(bodyParser.json());

// MySQL Connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '', // Default WAMP password is blank
  database: 'furniture_store'
});

db.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  console.log('Connected to MySQL database');
});

// API Routes
app.post('/api/register', (req, res) => {
  const { name, email, password, phone } = req.body;
  const query = 'INSERT INTO users (name, email, password, phone) VALUES (?, ?, ?, ?)';
  
  db.query(query, [name, email, password, phone], (err, result) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ message: 'Registration successful' });
  });
});

app.post('/api/feedback', (req, res) => {
  const { name, email, message, rating } = req.body;
  const query = 'INSERT INTO feedback (name, email, message, rating) VALUES (?, ?, ?, ?)';
  
  db.query(query, [name, email, message, rating], (err, result) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ message: 'Feedback submitted successfully' });
  });
});

app.post('/api/purchase', (req, res) => {
  const { customerName, email, address, phone, items, total } = req.body;
  
  // Start transaction
  db.beginTransaction((err) => {
    if (err) throw err;

    // Insert order
    const orderQuery = 'INSERT INTO orders (customer_name, email, address, phone, total) VALUES (?, ?, ?, ?, ?)';
    db.query(orderQuery, [customerName, email, address, phone, total], (err, result) => {
      if (err) {
        return db.rollback(() => {
          res.status(500).json({ error: err.message });
        });
      }

      const orderId = result.insertId;

      // Insert order items
      const itemValues = items.map(item => [orderId, item.productId, item.quantity]);
      const itemsQuery = 'INSERT INTO order_items (order_id, product_id, quantity) VALUES ?';
      
      db.query(itemsQuery, [itemValues], (err) => {
        if (err) {
          return db.rollback(() => {
            res.status(500).json({ error: err.message });
          });
        }

        db.commit((err) => {
          if (err) {
            return db.rollback(() => {
              res.status(500).json({ error: err.message });
            });
          }
          res.json({ message: 'Order placed successfully', orderId });
        });
      });
    });
  });
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});