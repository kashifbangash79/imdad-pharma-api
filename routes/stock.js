const express = require('express');
const router = express.Router();
const Stock = require('../models/Stock'); // Assuming you have a Stock model

// Function to format date to DD/MM/YYYY
const formatDate = (date) => {
  const d = new Date(date);
  const day = String(d.getDate()).padStart(2, '0');
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const year = d.getFullYear();
  return `${day}/${month}/${year}`;
};

// Get all stock entries
router.get('/stocks', async (req, res) => {
  try {
    const stocks = await Stock.find();
    const formattedStocks = stocks.map(stock => ({
      ...stock.toObject(),
      date: formatDate(stock.date)
    }));
    res.json(formattedStocks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get a specific stock entry by ID
router.get('/stocks/:id', async (req, res) => {
  try {
    const stock = await Stock.findById(req.params.id);
    if (!stock) return res.status(404).json({ message: 'Stock not found' });
    res.json({
      ...stock.toObject(),
      date: formatDate(stock.date)
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create a new stock entry
router.post('/stocks', async (req, res) => {
  const { name, quantity, unit, date } = req.body;
  const stock = new Stock({ name, quantity, unit, date });
  try {
    const newStock = await stock.save();
    res.status(201).json({
      ...newStock.toObject(),
      date: formatDate(newStock.date)
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update an existing stock entry
router.put('/stocks/:id', async (req, res) => {
  try {
    const stock = await Stock.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!stock) return res.status(404).json({ message: 'Stock not found' });
    res.json({
      ...stock.toObject(),
      date: formatDate(stock.date)
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete a stock entry
router.delete('/stocks/:id', async (req, res) => {
  try {
    const stock = await Stock.findByIdAndDelete(req.params.id);
    if (!stock) return res.status(404).json({ message: 'Stock not found' });
    res.json({ message: 'Stock deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
