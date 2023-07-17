const jwt = require("jsonwebtoken")
module.exports = function (req,res,next){
    const token =req.headers["x-auth-token"];
    if(!token){
      res.status(401).json("You are not authenticated")
    }else{
      jwt.verify(token, process.env.advisily_jwtPrivateKey, (err, decoded)=>{
        if(err){
          res.status(403).json("Token not Valid")
        }else{
          req.user = decoded
          next()
        }
      })
    }
  }