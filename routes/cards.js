const express = require("express");
// const user_jwt = require("../middleware/user_jwt");

const Cards = require('../models/Cards');

const router = express.Router();

//desc      Create new cards
// method POST
router.post('/', async (req, res, next) => {
    try {
       const Cards1 = await Cards.create({ title: req.body.title, description: req.body.description,place: req.body.place,price: req.body.price});
       if(!Cards1) {
            return res.status(400).json({
                success: false,
                msg: 'Something went wrong'
            });
       }

       res.status(200).json({
        success: true,
        cards: Cards1,
        msg: 'Successfully Created.'
    });
    } catch (error) {
        next(error);
    }
});


//desc Fetch all cards
//methods GET

router.get('/', async(req, res, next) => {
    try {
        const Cards2 = await Cards.find();
        if(!Cards2) {
            return res.status(400).json({ success: false, msg: 'Something error happend'});
        }

        res.status(200).json({ success: true, count:Cards2.length, cards: Cards2,
            msg: 'Successfully Fetched.' })
    } catch (error) {
        next(error);
    }
});

//desc Fetch all Finished cards
//methods GET

router.get('/finished', async(req, res, next) => {
    try {
        const Cards2 = await Cards.find({user: req.user.id, finished: true});
        if(!Cards2) {
            return res.status(400).json({ success: false, msg: 'Something error happend'});
        }

        res.status(200).json({ success: true, count:Cards2.length, cards: Cards2,
            msg: 'Successfully Fetched.' })
    } catch (error) {
        next(error);
    }
});

//desc Update all cards
//methods POST

router.put('/:id', async(req, res, next) => {
    try {
        let Cards3 = await Cards.findById(req.params.id);
        if(!Cards3){
            return res.status(400).json({success: false, msg: 'Task Card not exits'});
        }
        Cards3 = await Cards.findByIdAndUpdate(req.params.id, req.body ,{
            new: true, 
            runValidators: true
        });

        // if(!Cards3) {
        //     return res.status(400).json({success: false, msg: 'Some thong went wrong'});
        // }
        res.status(200).json({success: true, cards: Cards3, msg: 'Successfully updated'});
        
    } catch (error) {
        next(error);
    }
});

//desc DELETE all cards
//methods DELETE

router.delete('/:id', async (req, res, next) => {

    try {
        let Cards3 = await Cards.findById(req.params.id);
        if(!Cards3){
            return res.status(400).json({success: false, msg: 'Task Card not exits'});
        }

        Cards3 = await Cards.findByIdAndDelete(req.params.id);

        res.status(200).json({
            success:true, msg: 'Successfully Deleted CArds'
        });
        
    } catch (error) {
        next(error);
    }
    
});

module.exports = router;
