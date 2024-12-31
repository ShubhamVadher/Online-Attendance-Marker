const express=require("express");
const jwt=require("jsonwebtoken");
const profmodel=require("../models/prof");
const studentmodel=require("../models/student");


module.exports.isprofloggedin=async(req,res,next)=>{
    try{
        if(!req.cookies.token||req.cookies.token==""){
            return res.redirect("/?errorlogin=You Need To login First");
        }
        else{
            const data=jwt.verify(req.cookies.token,process.env.jwt_key);
            const user=await profmodel.findOne({_id:data.id});
            if(user){
                req.user=user;
                next();
            }
        }
    }
    catch(err){
        console.log(err);
    }
}

module.exports.isstudentloggedin=async(req,res,next)=>{
    try{
        if(!req.cookies.token||req.cookies.token==""){
            return res.redirect("/?errorlogin=You Need To login First");
        }
        else{
            const data=jwt.verify(req.cookies.token,process.env.jwt_key);
            const user=await studentmodel.findOne({_id:data.id});
            if(user){
                req.user=user;
                next();
            }
        }
    }
    catch(err){
        console.log(err);
    }
}
