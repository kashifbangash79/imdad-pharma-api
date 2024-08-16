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

const corsOptions = {
    origin: ["https://imdad-pharma.vercel.app"],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
};

// Apply CORS middleware
app.use(cors(corsOptions));
app.use(express.json());

const authRoutes = require('./routes/auth');
app.use('/api/auth', authRoutes);
app.use('/api/purchase-history', PurchaseHistoryRoutes);
app.use('/api/agent-payments', agentPaymentsRoutes);
app.use('/api/freight', freightRoutes);
app.use('/api', StockRoutes)
app.use('/api/customers', customerRoutes);
app.use('/recoveries', recoveriesRouter);
app.use('/api/expenses', expenseRoutes);

mongoose.connect(process.env.MONGO_URI).then(() => {
    console.log('Connected to MongoDB');
    app.listen(process.env.PORT || 3000, () => {
        console.log(`Server is running on port ${process.env.PORT || 3000}`);
    });
}).catch(err => {
    console.error('Failed to connect to MongoDB', err);
});
