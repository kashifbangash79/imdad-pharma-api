const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const recoverySchema = new Schema(
  {
    customerName: { type: String, required: true },
    amountRecovered: { type: Number, required: true },
    recoveryDate: { type: Date, required: true },
    loanAmount: { type: Number, required: true },
  },
  {
    timestamps: true,
  }
);

const Recovery = mongoose.model('Recovery', recoverySchema);

module.exports = Recovery;
