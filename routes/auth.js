const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const PurchaseHistory = require('../models/PurchaseHistory');


// Registration endpoint
router.post('/register', async (req, res) => {
    const { username, email, password } = req.body;

    try {
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ message: 'User already exists' });
        }

        user = new User({ username, email, password });

        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);

        await user.save();

        const payload = {
            user: {
                id: user.id
            }
        };

        jwt.sign(
            payload,
            process.env.JWT_SECRET,
            { expiresIn: '1h' },
            (err, token) => {
                if (err) throw err;
                res.status(201).json({ token });
            }
        );
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: 'Server error' });
    }
});

// Login endpoint
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const payload = {
            user: {
                id: user.id
            }
        };

        jwt.sign(
            payload,
            process.env.JWT_SECRET,
            { expiresIn: '1h' },
            (err, token) => {
                if (err) throw err;
                res.json({ token });
            }
        );
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: 'Server error' });
    }
});

router.post('/save', async (req, res) => {
    try {
        const { pkr, usd, date } = req.body;
        const newEntry = new PurchaseHistory({ pkr, usd, date });
        await newEntry.save();
        res.status(201).json({ message: 'Purchase history saved successfully', entry: newEntry });
    } catch (error) {
        res.status(500).json({ message: 'Error saving purchase history', error });
    }
});

// GET route to retrieve all purchase history entries
router.get('/', async (req, res) => {
    try {
        const history = await PurchaseHistory.find();
        res.status(200).json(history);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving purchase history', error });
    }
});


module.exports = router;
