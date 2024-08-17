const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const cors = require('cors');
const PurchaseHistoryRoutes = require('./routes/auth');
const agentPaymentsRoutes = require('./routes/agentPayments');
const freightRoutes = require('./routes/freightRoutes');
const StockRoutes = require('./routes/stock');
const customerRoutes = require('./routes/customers');
const recoveriesRouter = require('./routes/recoveries');
const expenseRoutes = require('./routes/dubaiPort');

dotenv.config();

const app = express();
app.use(bodyParser.json());

// const corsOptions = {
//   origin: ['https://imdad-pharma.vercel.app','*'],
//   methods: ['GET', 'POST', 'PUT', 'DELETE'],
//   allowedHeaders: ['Content-Type', 'Authorization'],
//   optionsSuccessStatus: 204
// };

// Apply CORS middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', PurchaseHistoryRoutes);
app.use('/api/purchase-history', PurchaseHistoryRoutes);
app.use('/api/agent-payments', agentPaymentsRoutes);
app.use('/api/freight', freightRoutes);
app.use('/api', StockRoutes);
app.use('/api/customers', customerRoutes);
app.use('/recoveries', recoveriesRouter);
app.use('/api/expenses', expenseRoutes);

// Connect to MongoDB and start the server
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(process.env.PORT || 3000, () => {
      console.log(`Server is running on port ${process.env.PORT || 3000}`);
    });
  })
  .catch(err => {
    console.error('Failed to connect to MongoDB', err);
  });

module.exports = app; // Export the app for Vercel
