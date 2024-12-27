const express=require("express");
const router=express.Router();
const profmodel=require("../models/prof");


router.post("/signup",async(req,res)=>{
    const {name,email,regno,password,cpassword}=req.body;


})


module.exports=router