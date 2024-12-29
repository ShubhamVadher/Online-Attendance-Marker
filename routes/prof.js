const express=require("express");
const router=express.Router();
const profmodel=require("../models/prof");
const subjectmodel=require("../models/subject");
const bcrypt=require("bcrypt");
const {tokengenerator}=require("../utils/tokengenerator");
const {isprofloggedin}=require("../middlewares/isloggedin");

router.post("/signup",async(req,res)=>{
    try{
        const {name,email,regno,password,cpassword}=req.body;
        const prof=await profmodel.findOne({email});
        if(prof){
            return res.status(400).redirect("/?errorsignup=User with this Email Already Exists");
        }
        if(password!=cpassword){
            return res.status(400).redirect("/?errorsignup=Password and Confirm Password Does Not Match");
        }
        else{
            
            bcrypt.genSalt(12,(err,salt)=>{
                bcrypt.hash(password,salt,async(err,hash)=>{
                    const prof=await profmodel.create({name,email,regno,password:hash,cpassword:hash});
                    const token=tokengenerator(prof);
                    res.cookie("token",token);
                    return res.redirect(`/prof/profile/${prof._id}`);
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
        const prof=await profmodel.findOne({email});
        if(prof){
            const result=await bcrypt.compare(password,prof.password);
            if(result){
                const token=tokengenerator(prof);
                res.cookie("token",token);
                return res.redirect(`/prof/profile/${prof._id}`)
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

router.get("/profile/:id",isprofloggedin,async(req,res)=>{
    await req.user.populate("subject_created");
    await req.user.save();
    // const subjects=[{name:"science"},{name:"math"},{name:"english"}]
    res.render("profprofile",{user:req.user});
})

router.get("/logout/:id",isprofloggedin,(req,res)=>{
    res.cookie("token","");
    res.redirect("/");
})



router.post("/createsubject/:id",isprofloggedin,async(req,res)=>{
    
    const subject=await subjectmodel.create({name:req.body.name,prof_created:req.params.id});
    req.user.subject_created.push(subject._id);
    await req.user.populate("subject_created");
    await req.user.save();
    res.redirect(`/prof/profile/${req.params.id}`);
})


router.get("/checkattendance/:id", isprofloggedin, async (req, res) => {
    try {
        const subject = await subjectmodel
            .findOne({ _id: req.params.id })
            .populate("prof_created")
            .populate({
                path: "class_details.student_ids", // Path to student_ids within class_details
                model: "student",
            });

        res.render("ChooseDate", { subject });
    } catch (err) {
        console.error(err);
        res.status(500).send("Server Error");
    }
});

router.get("/checkdate/:sid/:did", isprofloggedin, async (req, res) => {
    const subject = await subjectmodel.findOne({ _id: req.params.sid }).populate({
        path: "class_details.student_ids",
        select: "name regno",
    });

    const classDetail = subject.class_details.find(
        (detail) => detail._id.toString() === req.params.did
    );

    if (classDetail) {
        const students = classDetail.student_ids;
        res.render("studentlist", { students, subjectName: subject.name });
    } else {
        res.status(404).send("Class details not found.");
    }
});





module.exports=router;