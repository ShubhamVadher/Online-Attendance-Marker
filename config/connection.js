const mongoose=require("mongoose");

const uri=process.env.uri;
mongoose.connect(uri)
.then(()=>{
    console.log("Connected to DB");
})
.catch((err)=>{
    console.log(err);
})

module.exports=mongoose.connection;