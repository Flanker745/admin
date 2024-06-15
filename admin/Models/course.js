const mongoose = require('mongoose');
const courseSchema = new mongoose.Schema({
    
    coursename:{
        type:String,
        required:true
    },
    courseprice:{
        type:String,
        required:true
    },
    coursedur:{
        type:String,
        required:true
    }
    ,
    coursedes:{
        type:String,
        required:true
    },
    coursesimg:{
        type:String,
        required:true
    },
    coursestatus:{
        type:Boolean,
        required:true
    }

})
const course = mongoose.model("courses" , courseSchema);
module.exports = course