const express=require("express");
const router=express.Router();

router.get("/",(req,res)=>{
    const errorsignin=req.query.error||"";
    const errorsignup=req.query.error||"";
    res.render("index",{errorsignin,errorsignup});
})


module.exports=router;