const mongoose = require("mongoose");

const ContectSchema = new mongoose.Schema({
    user :{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'user'
    },
    contect : {
        type : String,
        required : true,
        unique : true
    }
}, {timestamps : true });

module.exports = mongoose.models.Contects || mongoose.model("Contect" , ContectSchema);