import dotenv from 'dotenv';
dotenv.config();
import userModel from "./models/user.model.js";
import userRouter from "./routes/user-route.js"
import taskRouter from "./routes/task-route.js"
import { errorMiddleware } from "./middlewares/error.js";
import cookieParser from "cookie-parser";
import cors from "cors";


import express from "express";
export const app = express();

// Using Middlewares
app.use(cookieParser());
app.use(express.json());
app.use(cors({
    origin:[process.env.FRONTEND_URI],
    methods:["GET","POST","DELETE","PUT"],
    credentials:true,
}))


// Using Routes

app.use("/api/v1/users",userRouter);
app.use("/api/v1/tasks",taskRouter);


// For ENV CHECK

if(process.env.NODE_ENV === "development"){
    app.get('/',(req,res)=>{
        res.send("server is ready")
    })
}
if(process.env.NODE_ENV === "production"){
    app.get('/',(req,res)=>{
        res.send("Working Good")
    })
}

// Custom Middleware
// Always put error middleware at the end 
app.use(errorMiddleware)
