const express = require('express');
const Expense = require('../models/dubaiPort');

const router = express.Router();

// Function to format date to DD/MM/YYYY
const formatDate = (date) => {
  const d = new Date(date);
  const day = String(d.getDate()).padStart(2, '0');
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const year = d.getFullYear();
  return `${day}/${month}/${year}`;
};

// Create a new expense
router.post('/', async (req, res) => {
  try {
    const expense = new Expense(req.body);
    await expense.save();
    const formattedExpense = { ...expense.toObject(), date: formatDate(expense.date) };
    res.status(201).json(formattedExpense);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get all expenses
router.get('/', async (req, res) => {
  try {
    const expenses = await Expense.find();
    const formattedExpenses = expenses.map(expense => ({
      ...expense.toObject(),
      date: formatDate(expense.date)
    }));
    res.status(200).json(formattedExpenses);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Update an expense
router.put('/:id', async (req, res) => {
  try {
    const expense = await Expense.findByIdAndUpdate(req.params.id, req.body, { new: true });
    const formattedExpense = { ...expense.toObject(), date: formatDate(expense.date) };
    res.status(200).json(formattedExpense);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Delete an expense
router.delete('/:id', async (req, res) => {
  try {
    const expense = await Expense.findByIdAndDelete(req.params.id);
    const formattedExpense = { ...expense.toObject(), date: formatDate(expense.date) };
    res.status(200).json({ message: 'Expense deleted', deletedExpense: formattedExpense });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
