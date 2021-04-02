const mongoose= require('mongoose');

var schema=new mongoose.Schema({
    task_name:{
        type:String,
        required:true
    },
    task_description:{
        type:String,
        required:true
    },
    creater:{
        type:String,
        required:true
    },
    duration:{
        type:String,
        required:true
    },
    created_at:{
        type:String,
        required:true
    },
})

const Userdb= mongoose.model('userdb',schema);
module.exports=Userdb;