const express = require("express");
const user_jwt = require("../middleware/user_jwt");
const Payment = require('../models/Payment');
const router = express.Router();

//desc      Create new Payment
// method POST
router.post('/', user_jwt, async (req, res, next) => {
    try {
       const Payment1 = await Payment.create({ cardname: req.body.cardname, cardnumber: req.body.cardnumber, expdate: req.body.expdate, cvv: req.body.cvv,user: req.user.id,createdAt:req.body.createdAt});
       if(!Payment1) {
            return res.status(400).json({
                success: false,
                msg: 'Something went wrong'
            });
       }

       res.status(200).json({
        success: true,
        //payment: Payment1,
        msg: 'Successfully Created.'
    });
    } catch (error) {
        next(error);
    }
});

module.exports = router;
