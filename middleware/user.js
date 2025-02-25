const jwt = require("jsonwebtoken");
const jwtsecret ="123456";

const userMiddleware = async(req,res,next)=>{
   const username = req.headers.username;
   const authorization  = req.headers.authorization;
   const jwttoken = authorization.split(" ");
   const token = jwttoken[1];

 try{
    const verify = jwt.verify(token,jwtsecret);

    if(verify.username){
        next();
    }else{
        res.send("not verfied user");
    }
 }catch(error){
    res.send(error.message)
 }

}
module.exports = userMiddleware;