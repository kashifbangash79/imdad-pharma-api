const router = require('express').Router();
let Recovery = require('../models/Recovery');

router.route('/').get( async (req, res) => {
    try{

        const recovery = await Recovery.find();
        res.json(recovery);
    } catch(err){
        res.status(500).json({ message: err.message });
    };
});

router.route('/add').post((req, res) => {
  const customerName = req.body.customerName;
  const amountRecovered = Number(req.body.amountRecovered);
  const recoveryDate = Date.parse(req.body.recoveryDate);
  const loanAmount = Number(req.body.loanAmount);

  const newRecovery = new Recovery({
    customerName,
    amountRecovered,
    recoveryDate,
    loanAmount,
  });

  newRecovery.save()
    .then(() => res.json('Recovery added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;
