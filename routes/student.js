const express=require("express");
const router=express.Router();
const studentmodel=require("../models/student");
const subjectmodel=require("../models/subject");
const bcrypt=require("bcrypt");
const {tokengenerator}=require("../utils/tokengenerator");
const {isstudentloggedin}=require("../middlewares/isloggedin");

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
                    const student=await studentmodel.create({name,email,regno,password:hash,cpassword:hash});
                    const token=tokengenerator(student);
                    res.cookie("token",token);
                    return res.redirect(`/student/profile/${student._id}`);
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
                const token=tokengenerator(student);
                res.cookie("token",token);
                return res.redirect(`/student/profile/${student._id}`)
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

router.get("/profile/:id",isstudentloggedin,async(req,res)=>{
    await req.user.populate("classes_enrolled");
    await req.user.save();
    
    res.render("studentprofile",{student:req.user});;
})


router.get("/logout/:id",isstudentloggedin,(req,res)=>{
    res.cookie("token","");
    res.redirect("/");
})

router.post("/joinclass/:id",isstudentloggedin,async(req,res)=>{
    const student=await studentmodel.findOne({_id:req.params.id});
    student.classes_enrolled.push(req.body.classId);
    await student.save();
    res.redirect(`/student/profile/${req.params.id}`);

})



module.exports=router;