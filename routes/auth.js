const express = require('express');
const { body } = require('express-validator');

const router = express.Router();

router.post("/login" ,[body()], (req, res) => {
    
});

router.post("/signup" , (req, res) =>{
    res.send("signup")
});

module.exports = router;