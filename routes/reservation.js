const express = require("express");
const user_jwt = require("../middleware/user_jwt");

const Reservation = require('../models/Reservation');

const router = express.Router();

//desc      Create new Reservation
// method POST
router.post('/', user_jwt, async (req, res, next) => {
    try {
       const Reservation1 = await Reservation.create({ fname: req.body.fname, lname: req.body.lname, email: req.body.email, contactno: req.body.contactno,user: req.user.id,createdAt:req.body.createdAt});
       if(!Reservation1) {
            return res.status(400).json({
                success: false,
                msg: 'Something went wrong'
            });
       }

       res.status(200).json({
        success: true,
        //reservation: Reservation1,
        msg: 'Successfully Created.'
    });
    } catch (error) {
        next(error);
    }
});

module.exports = router;
