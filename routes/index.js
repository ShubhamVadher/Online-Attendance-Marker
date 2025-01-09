const express=require("express");
const router=express.Router();

router.get("/",(req,res)=>{
    const errorsignin=req.query.errorsignin||"";
    
    res.render("student-login",{errorsignin});
    
})

router.get("/proflogin",(req,res)=>{
    const errorsignin=req.query.errorsignin||"";
    
    res.render("professor-login",{errorsignin});
})

router.get("/profsignup",(req,res)=>{
    
    const errorsignup=req.query.errorsignup||"";
    res.render("professor-signup",{errorsignup});
})

router.get("/studentsignup",(req,res)=>{
    
    const errorsignup=req.query.errorsignup||"";
    res.render("student-signup",{errorsignup});
})


module.exports=router;
