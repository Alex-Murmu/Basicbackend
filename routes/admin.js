const express = require("express");
const router = express.Router();
const {Admin ,Course, User} = require('../db/index');
const jwt = require("jsonwebtoken");
const jwtsecret = "123456";
const Adminmiddleware = require("../middleware/admin")

// admin signup
router.post("/signup",async(req,res)=>{
    const username = req.body.username;
    const password = req.body.password;

    const newAdmin = {
        username:username,
        password:password
    }

    try{
        await Admin.create(newAdmin);
        res.send("Admin created successfully");
    }catch(error){
        res.send.json({msg:"error creating Admin",detaials:error.message});
    }
});

// admin login
router.post("/signin",async(req,res)=>{
    
    const username = req.body.username;
    const password = req.body.password;

    try{
       const admin  =  await Admin.findOne({username:username,password});
        if(!admin){
            res.send("invalid user input ||| or no Admin account found")
        }
        const token = jwt.sign({username},jwtsecret);
        res.status(200).json({message:"user logged in",token})
    }
    catch(error){
        res.send(error)
    }
});

router.post("/course",Adminmiddleware,async(req,res)=>{
    const input = req.body;
    const newCourse = {
        title:input.title,
        description:input.description,
        imageLink:input.imageLink,
        price:input.price,
        auther:input.auther
    }

    try{
        await Course.create(newCourse);

        res.send("Course Created successfully")
    }
    catch(error){
        res.send(error)
    }
})


module.exports = router;