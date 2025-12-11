const User = require("../models/user");
const jwt=require('jsonwebtoken');
module.exports.protect=async(req,res,next)=>{
    try{
const token=req.cookies.jwt;
if(!token){
    return res.status(400).json({message:"unauthorized-no token provided"});
}
const decoded=jwt.verify(token,"MySecretKey");
if(!decoded){
    return res.status(400).json({message:"unauthorized-invalid token"});

}
const user=await User.findById(decoded.userId).select("-password");
if(!user){
    return res.status(400).json({message:"No User Found"});
}
req.user=user;
next();
    }
catch(error){
    console.log("error in protected middleware",error);
    res.status(500).json({message:"internal server error"})
}

}