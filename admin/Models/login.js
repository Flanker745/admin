const mongoose = require('mongoose');

const loginSchema = new mongoose.Schema({
    username:{
        type:String,
        unique:true
    },
    password:String
})
const login = mongoose.model('users' , loginSchema);
module.exports=login
