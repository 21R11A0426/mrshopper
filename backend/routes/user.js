const express=require('express');
const Router=express.Router();
const {register,login,logout}=require('../controllers/user.js');
const {protect}=require('../middleware/middleware.js');
Router.post('/register',register);
Router.post('/login',login);
Router.post('/logout',logout);
Router.get('/me', protect, (req,res)=>{
    return res.status(200).json(req.user);
});
module.exports=Router;