require('dotenv').config();
const jwt = require("jsonwebtoken");

const fatchuser = (req, res, next) =>{
    const authToken = req.header('authToken');

    if(!authToken){
        res.status(401).json({Error : "Please authenticate with a valid token"})
    }

    try {
        const data = jwt.verify(authToken, process.env.SECRET);
        req.user = data.user;
        next();
    } catch (error) {
        res.status(401).json({error : "Please authenticate with a valid token"})
    }
}

module.exports = fatchuser;