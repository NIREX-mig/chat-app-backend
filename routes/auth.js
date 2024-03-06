require('dotenv').config();
const express = require('express');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const User = require('../models/User');
const jwt = require('jsonwebtoken');

const router = express.Router();

router.post("/login",
    [body('email', "Enter a valid email").isEmail(),
    body('password', "password contains atleast 8 charactors").exists()
    ], async (req, res) => {
        const result = validationResult(req);
        if (!result.isEmpty()) {
            return res.status(400).json({ Error: result.array() });
        }
        try {

            const {email,password} = req.body;

            let success = false;

            let user = await User.findOne({email});

            if(!user){
                success = false;
                return res.status(400).json({success, Error : "Invalid Credential"});
            }
            
            const compairpass =await bcrypt.compare(password,user.password);

            if(!compairpass){
                success = false;
                return res.status(400).json({success, Error : "Invalid Credential"});
            }

            //create payload
            const data = {
                user : {
                    id : user.id
                }
            };

            const authToken = jwt.sign(data,process.env.SECRET);
            success = true;
            res.status(200).json({success, authToken})
        } catch (error) {
            console.error(error.message);
            res.status(500).json({Error : "Internal Server error"})

        }

    });

router.post("/signup",[
    body('email', "Enter a vlaid email").isEmail(),
    body('password', "Password must be atleast 8 characters").isLength({min:8})
], async (req, res) => {
    const result = validationResult(req);
    if (!result.isEmpty()) {
        return res.status(400).json({ Error: result.array() });
    }
        const {email, password} = req.body;
        let success = false;

        let user = await User.findOne({email : email});

        if(user){
            success = false;
            return res.status(400).json({success,Error : "Sorry Email Already Exist"});
        }

        const salt = await bcrypt.genSalt(10);
        const secpass = await bcrypt.hash(password,salt);

        user = User.create({
            email : email,
            password : secpass
        });

        // create payload for jwt
        const data = {
            user : {
                id : user.id
            }
        };

        const authToken = jwt.sign(data,process.env.SECRET);
        success = true;

        res.status(200).json({success, authToken})

    try {
        
    } catch (error) {
        console.error(error.message);
        res.status(500).json({Error : "Internal server Error"});
    }
});

module.exports = router;