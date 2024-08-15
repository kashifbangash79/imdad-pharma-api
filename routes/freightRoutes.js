const express = require('express');
const Freight = require('../models/Freight');
const router = express.Router();

// Get all freight details
router.get('/', async (req, res) => {
  try {
    const freights = await Freight.find();
    res.json(freights);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get a specific freight detail
router.get('/:id', async (req, res) => {
  try {
    const freight = await Freight.findById(req.params.id);
    if (!freight) {
      return res.status(404).json({ message: 'Freight not found' });
    }
    res.json(freight);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create a new freight detail
router.post('/', async (req, res) => {
  const freight = new Freight(req.body);
  try {
    const newFreight = await freight.save();
    res.status(201).json(newFreight);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update a freight detail
router.put('/:id', async (req, res) => {
  try {
    const freight = await Freight.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!freight) {
      return res.status(404).json({ message: 'Freight not found' });
    }
    res.json(freight);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete a freight detail
router.delete('/:id', async (req, res) => {
  try {
    const freight = await Freight.findByIdAndDelete(req.params.id);
    if (!freight) {
      return res.status(404).json({ message: 'Freight not found' });
    }
    res.json({ message: 'Freight deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
