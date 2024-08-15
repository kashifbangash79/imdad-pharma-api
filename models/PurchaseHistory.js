// models/PurchaseHistory.js
const mongoose = require('mongoose');

const PurchaseHistorySchema = new mongoose.Schema({
    pkr: Number,
    usd: Number,
    date: String
});

module.exports = mongoose.model('PurchaseHistory', PurchaseHistorySchema);
