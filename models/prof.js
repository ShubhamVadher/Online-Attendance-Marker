const mongoose=require("mongoose");

const profschema=mongoose.Schema({
    name:{
        type:String,
        require:true
    },
    email:String,
    password:String,
    cpassword:String,
    regno:{
        type:Number
    },
    classes_created:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"subject"
        }
    ]
})

module.exports=mongoose.model("prof",profschema);