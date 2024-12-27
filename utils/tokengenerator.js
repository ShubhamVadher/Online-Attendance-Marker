const jwt=require("jsonwebtoken");

module.exports.tokengenerator=(user)=>{
    const token=jwt.sign({email:user.email,id:user._id},process.env.jwt_key);
    return token;
}