const express = require('express');
const router = express.Router();
const AgentPayment = require('../models/AgentPayment');

// Function to format date to DD/MM/YYYY
const formatDate = (date) => {
  const d = new Date(date);
  const day = String(d.getDate()).padStart(2, '0');
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const year = d.getFullYear();
  return `${day}/${month}/${year}`;
};

// GET all agent payments
router.get('/', async (req, res) => {
  try {
    const agentPayments = await AgentPayment.find();
    res.json(agentPayments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST a new agent payment
router.post('/save', async (req, res) => {
  const { shipmentNumber, arrivalDate, agentName, paymentAmount, paymentDate, paymentStatus } = req.body;

  const newAgentPayment = new AgentPayment({
    shipmentNumber,
    arrivalDate: formatDate(arrivalDate),
    agentName,
    paymentAmount,
    paymentDate: formatDate(paymentDate),
    paymentStatus,
  });

  try {
    const savedAgentPayment = await newAgentPayment.save();
    res.status(201).json(savedAgentPayment);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// PUT to update an existing agent payment
router.put('/update/:id', async (req, res) => {
  const { id } = req.params;
  const { shipmentNumber, arrivalDate, agentName, paymentAmount, paymentDate, paymentStatus } = req.body;

  try {
    const updatedAgentPayment = await AgentPayment.findByIdAndUpdate(
      id,
      {
        shipmentNumber,
        arrivalDate: formatDate(arrivalDate),
        agentName,
        paymentAmount,
        paymentDate: formatDate(paymentDate),
        paymentStatus,
      },
      { new: true }
    );

    if (!updatedAgentPayment) {
      return res.status(404).json({ message: 'Agent Payment not found' });
    }

    res.json(updatedAgentPayment);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
