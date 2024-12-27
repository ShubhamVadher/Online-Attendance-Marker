const mongoose=require("mongoose");

const studentschema=mongoose.Schema({
    name:{
        type:String,
        require:true
    },
    email:String,
    password:String,
    cpassword:String,
    regno:{
        type:Number,
    },
    classes_enrolled:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"subject"
    }]

})

module.exports=mongoose.model("student",studentschema);