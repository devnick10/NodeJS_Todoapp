import jwt from "jsonwebtoken";
import userModel from "../models/user.model.js";

export const isauthenticated = async(req,res,next)=>{

    const token= req.cookies.token;
    if(!token)return res.status(404).json({success:false,message:"Login first",})
    
    const decoded = jwt.verify(token,process.env.JWT_KEY);
    req.user  = await userModel.findOne({_id:decoded._id});
    next();
    
    

}