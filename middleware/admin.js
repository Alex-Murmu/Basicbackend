const jwt = require("jsonwebtoken");
const jwtsecret = "123456";


const Adminmiddleware = async (req,res,next)=>{
  const username =req.headers.usesrname;
  const jwttoken = req.headers.authorization;
  const jwttoken2 = jwttoken.split(" ");
  const token = jwttoken2[1];

  try{
    const decoded = jwt.verify(token,jwtsecret);
    if(decoded.username){
        next();
    }
    else{
        res.send("user not found ||| invalid token");
    }
  }catch(error){
    res.send(error);
  }
}

module.exports = Adminmiddleware;