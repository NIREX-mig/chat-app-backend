const express = require('express');
const { body, validationResult } = require('express-validator');
const User = require('../models/User');
const Contect = require('../models/Contect');
const fatchuser = require('../middleware/fatchuser');
const router = express.Router();

router.post('/addcontect', fatchuser, [body("email", "Enter a valid Email").isEmail()], async (req, res) => {
    const result = validationResult(req);
    if (!result.isEmpty()) {
        return res.status(400).json({ Error: result.array() });
    }

    try {
        const { email } = req.body;

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ Error: "Email dose not exist" });
        }


        // check contect is not a user
        if (user) {
            if (user.id === req.user.id) {
                return res.status(400).json({ Error: "Sorry invalid email" });
            }
        }

        const contect = new Contect({
            user : req.user.id,
            contect : email 
        })

        const savedContect = await contect.save();

        res.status(200).json({savedContect,Message : "Successfully Add" })

    } catch (error) {
        console.error(error.message);
        res.status(500).json({ Error: "Internal Server Error" });
    }
});

router.get('/getcontects', fatchuser, async (req, res) => {
    try {
        const contects = await Contect.find({ user: req.user.id });
        res.status(200).json(contects);
    } catch (error) {
        console.error(error.message);
        res.status(500).json("Internal Server Error");
    }
});

module.exports = router;