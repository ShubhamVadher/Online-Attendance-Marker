const mongoose = require("mongoose");

const subjectschema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    
    prof_created:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "prof" 
    },
    session_status:{
        type:Boolean,
        default:false
    },
    class_details: [
        {
            date: {
                type: Date,
                required: true 
            },
            student_ids: [{ 
                type: mongoose.Schema.Types.ObjectId, 
                ref: "student" 
            }]
        }
    ]
});

module.exports = mongoose.model("subject", subjectschema);