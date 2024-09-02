import express from "express";
const router = express.Router();
import { createtask , deleteTask, getMyTasks, updateTask} from "../controllers/task.controller.js";
import { isauthenticated } from "../middlewares/auth.js";

router.post('/create',isauthenticated,createtask);
router.get('/alltask',isauthenticated,getMyTasks);

router.route('/:id').put(isauthenticated,updateTask).delete(isauthenticated,deleteTask)


export default router;