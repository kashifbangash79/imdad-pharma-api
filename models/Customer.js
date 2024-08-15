const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CustomerSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  address: { type: String, required: true },
  sales: { type: Number, required: true },
  purchases: { type: Number, required: true },
});

module.exports = mongoose.model('Customer', CustomerSchema);
