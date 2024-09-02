import ErrorHandler from "../middlewares/error.js";
import taskModel from "../models/task.model.js";

export const createtask = async (req,res,next) => {
 try {
   let { title, discription } = req.body;
   if(!title || !discription)return next(new ErrorHandler("Plz fill all fields.",400))
   const task = await taskModel.create({ title, discription, user: req.user });
   if(!task)return next(new ErrorHandler("Task Creation Faild",404));
   res.status(201).json({
     success: true,
     message: "Task Added Successfully.",
   });
 } catch (error) {
  next(error)
 }
};
export const getMyTasks = async (req,res,next) => {
   try {
    
   const tasks = await taskModel.find({user:req.user._id});
   if(!tasks)return next(new ErrorHandler("Task NOT Yet",404))
   res.status(201).json({
     success: true,
     tasks,
   });
   } catch (error) {
    next(error);
   }
};
export const updateTask = async (req,res,next) => {
 try {
  
   const {id} = req.params
 
   const task = await taskModel.findById(id);
   if(!task)return next(new ErrorHandler("Invalid Task ID",404))
   
   task.iscompleted = !task.iscompleted 
 
   await task.save();
 
   res.status(200).json({
     success: true,
     message:"Task Updated. "
   });
 } catch (error) {
   next(error)
 }
};
export const deleteTask = async (req,res,next) => {
  try {
    
    const {id} = req.params
  
    const task = await taskModel.findById(id);
    if(!task)return next(new ErrorHandler("Invalid Task ID",404))
  
    await task.deleteOne();
  
    res.status(200).json({
      success: true,
      message:"Task Deleted."
  
    });
  } catch (error) {
    next(error);
  }
};
