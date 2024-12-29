const express=require("express");
const router=express.Router();
const profmodel=require("../models/prof");
const subjectmodel=require("../models/subject");


router.post("/attendance/:id",async(req,res)=>{
    const subject=await subjectmodel.findOne({_id:req.params.id});
    if(subject.session_status==false){
        subject.session_status=true;
        
        const newclass={
            date:Date.now()
        }
        subject.class_details.push(newclass);
        await subject.save();
    
        res.redirect(`/prof/profile/${subject.prof_created}`);

    }
    else{
        subject.session_status=false;
        await subject.save();
        res.redirect(`/prof/profile/${subject.prof_created}`);
    }

})


module.exports=router