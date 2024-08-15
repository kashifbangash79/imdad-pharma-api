const mongoose = require('mongoose');

const agentPaymentSchema = new mongoose.Schema({
  shipmentNumber: { type: String, required: true },
  arrivalDate: { type: String, required: true },
  agentName: { type: String, required: true },
  paymentAmount: { type: Number, required: true },
  paymentDate: { type: String, required: true },
  paymentStatus: { type: String, required: true, enum: ['Pending', 'Completed', 'Failed'] },
});

const AgentPayment = mongoose.model('AgentPayment', agentPaymentSchema);

module.exports = AgentPayment;
