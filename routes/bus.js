const express = require("express");
const user_jwt = require("../middleware/user_jwt");
const Bus = require('../models/Bus');

const router = express.Router();

//desc      Create new Bus
// method POST
router.post('/', user_jwt, async (req, res, next) => {
    try {
       const Bus1 = await Bus.create({ name: req.body.name, email: req.body.email, from: req.body.from, to: req.body.to,user: req.user.id,people:req.body.people,date:req.body.date,time:req.body.time,class:req.body.class});
       if(!Bus1) {
            return res.status(400).json({
                success: false,
                msg: 'Something went wrong'
            });
       }

       res.status(200).json({
        success: true,
        //reservation: Bus1,
        msg: 'Successfully Created.'
    });
    } catch (error) {
        next(error);
    }
});

//desc Fetch all reservations
//methods GET

router.get('/', async(req, res, next) => {
    try {
        const Resrerve = await  Bus.find();
        if(!Resrerve) {
            return res.status(400).json({ success: false, msg: 'Something error happend'});
        }

        res.status(200).json({ success: true, count:Resrerve.length, data: Resrerve,
            msg: 'Successfully Fetched.' })
    } catch (error) {
        next(error);
    }
});

module.exports = router;
