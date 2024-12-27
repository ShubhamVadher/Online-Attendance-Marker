require("dotenv").config();
const express=require("express");
const db=require("./config/connection");
const studentmodel=require("./models/student");
const profmodel=require("./models/prof");
const subjectmodel=require("./models/subject");
const home=require("./routes/index");
const student=require("./routes/student");
const prof=require("./routes/prof");
const subject=require("./routes/subject");
const path=require("path");
const cookieparser=require("cookie-parser");

const app=express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname,"public")));
app.set("view engine","ejs");
app.use(cookieparser());

app.use("/",home);
app.use("/prof",prof);
app.use("/student",student);
app.use("/subject",subject);

app.listen(3000);