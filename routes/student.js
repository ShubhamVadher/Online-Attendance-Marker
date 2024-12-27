const express=require("express");
const router=express.Router();
const studentmodel=require("../models/prof");
const bcrypt=require("bcrypt");
const {tokengenerator}=require("../utils/tokengenerator");

router.post("/signup",async(req,res)=>{
    try{
        const {name,email,regno,password,cpassword}=req.body;
        const student=await studentmodel.findOne({email});
        if(student){
            return res.status(400).redirect("/?errorsignup=User with this Email Already Exists");
        }
        if(password!=cpassword){
            return res.status(400).redirect("/?errorsignup=Password and Confirm Password Does Not Match");
        }
        else{
            
            bcrypt.genSalt(12,(err,salt)=>{
                bcrypt.hash(password,salt,async(err,hash)=>{
                    const prof=await studentmodel.create({name,email,regno,password:hash,cpassword:hash});
                    const token=tokengenerator(prof);
                    res.cookie("token",token);
                    return res.redirect("/student/profile");
                })
            })
            
        }
    }
    catch(err){
        console.log(err);
    }
})

router.post("/signin",async(req,res)=>{
    try{
        const {email,password}=req.body;
        const student=await studentmodel.findOne({email});
        if(student){
            const result=await bcrypt.compare(password,student.password);
            if(result){
                const token=tokengenerator(prof);
                res.cookie("token",token);
                return res.redirect("/prof/proflie")
            }
            else{
                return res.redirect("/?signinerror=Email OR Password is wrong")
            }
        }
        return res.redirect("/?signinerror=Email OR Password is wrong")
    }
    catch(err){
        console.log("Something went Wrong ",err)
    }
})


module.exports=router;