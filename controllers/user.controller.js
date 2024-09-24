import mongoose from "mongoose";
import userModel from "../models/user.model.js";
import bcrypt from "bcrypt";
import { sendCookie } from "../utils/features.js";
import ErrorHandler from "../middlewares/error.js";

export const getMyProfile =(req,res)=>{
   
    res.status(200).json({
        success:true,
        user:req.user,
    })}

export const register = async(req,res,next)=>{
try {

  let {name,email,password} = req.body;
  
  let userExist = await userModel.findOne({email});
 
  if(userExist)return next(new ErrorHandler("User Allready Exist.",400))
 
   const hashedPassword = await bcrypt.hash(password,10);
 
   const user = await userModel.create({name,email,password:hashedPassword,});
    
   sendCookie(res,user,"Registed Successfully.",201)
} catch (error) {
next(error)
}
}
export const login  = async(req,res,next)=>{
   try {

    let {email,password} = req.body;
    if(!email || !password)return next(new ErrorHandler("Plz fill all Field's",400))
      
    let user = await userModel.findOne({email}).select("+password");
    if(!user)return next(new ErrorHandler("Invailed Email OR Password.",400))
     
     
    const ismatch = await bcrypt.compare(password,user.password);
    if(!ismatch)return next(new ErrorHandler("Invailed Email OR Password.",400))
  
    sendCookie(res,user,`Welcome back ${user.name}`,200)
   } catch (error) {

    next(error)

   }

}
export const logout = (req,res)=>{
  
  
  res.status(200).cookie("token","",{
    expires:new Date( Date.now()),
    sameSite:process.env.NODE_ENV === "development"?"lax":"none",
    secure:process.env.NODE_ENV === "development"?false:true,
}).json({
        success:true,
        message:"Logout Successfully.",
    })

}