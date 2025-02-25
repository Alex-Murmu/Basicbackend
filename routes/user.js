const express = require("express");
const router = express.Router();
const {User ,Course} = require("../db/index")
const jwt = require("jsonwebtoken");
const userMiddleware = require("../middleware/user");
const jwtsecret = "123456";


// user signup route
router.post("/signup",async(req,res)=>{
    const username = req.body.username;
    const password = req.body.password;
    console.log(username, password)

    const newUser = {
        username:username,
        password:password
    }

 try {
    await User.create(newUser);
    res.send("user Crearte successfully")
 } catch (error) {
    res.send("error")
 }
})

// user login route

router.post("/signin",async (req,res)=>{
    const username = req.body.username;
    const password = req.body.password;
    console.log("reached")

    try{
        const user  = await User.findOne({username,password});
        if(!user){
           res.send("user not found")
        }
        const token = jwt.sign({username},jwtsecret);
        res.status(200).json({user,token})
    }catch(error){
        res.send(error.message)
    }
})


// see list of courses 

router.get("/Courses",userMiddleware,async(req,res)=>{

    const courses = await Course.find({});
    res.send(courses)
    
});
// enrolled in course
router.post("/courses/:courseId",userMiddleware, async(req,res)=>{
     const courseId = req.params.courseId;
     const username = req.headers.username;
     
     try{
        const isFind = await User.find({username:username});
        console.log(isFind)
        if(isFind.username){
            await User.updateOne({username:username},{"$push":{purchasedCourse:courseId}});
            res.send("Course purches successfully");
        }
        else{
            res.send("user not matched")
        }
     }
     catch(error){
        res.send(error.message)
     }

})
//see the enrolled course
router.get("/purchasedcourse",userMiddleware,async(req,res)=>{
    const user = await User.findOne({username:req.headers.username})
    const courses = Course.find({_id:{"$in":user.purchasedCourse}});
    res.send("course Purchased successfully");
})

router.use((error,req,res,next)=>{
    res.send(error)
    next()
})
module.exports = router;
