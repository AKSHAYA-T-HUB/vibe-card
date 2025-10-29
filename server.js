const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// Sample product data
const products = [
  { id: 1, name: 'Wireless Headphones', price: 1200 },
  { id: 2, name: 'Smart Watch', price: 2500 },
  { id: 3, name: 'Bluetooth Speaker', price: 1800 }
];

// Routes
app.get('/products', (req, res) => {
  res.json(products);
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
