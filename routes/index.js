const express=require("express");
const router=express.Router();

router.get("/",(req,res)=>{
    const errorsignin=req.query.errorsignin||"";
    const errorsignup=req.query.errorsignup||"";
    res.render("index",{errorsignin,errorsignup});
})


module.exports=router;