import mongoose  from "mongoose";
import userModel from "./user.model.js";

const taskSchema = new mongoose.Schema({
    title:{type:String,required:true},
    discription:{type:String,required:true},
    iscompleted:{
        type:Boolean,
        default:false
    },
    user:[{type:mongoose.Schema.Types.ObjectId,ref:"user",required:true}],
    createdAt:{type:Date,default:Date.now()}
})

export default mongoose.model("task",taskSchema);