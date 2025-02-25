const mongoose = require("mongoose");

const dbconnection =async()=>{
    try{
        await mongoose.connect("mongodb+srv://ftalexrayen:2frdH6xQ0HoEIpXz@cluster0.ew5fs.mongodb.net/newdb");
        console.log("bd connected")
    }
    catch(error){
        console.log("db error")
    }
}

dbconnection();
const UserSchema = new mongoose.Schema({
    username:String,
    password:String,
    purchasedCourse:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Course"
    }]
})


const AdminSchema = new mongoose.Schema({
    username:String,
    password:String
});


const CourseSchema = new mongoose.Schema({
    title:String,
    description:String,
    imageLink:String,
    price:Number,
    Auther:String
});


const User  = new mongoose.model("User",UserSchema);
const Admin  = new mongoose.model("Admin",AdminSchema);
const Course  = new mongoose.model("Course",CourseSchema);

module.exports = {User,Admin,Course};