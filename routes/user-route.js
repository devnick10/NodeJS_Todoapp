import express from "express";
const router = express.Router();
import { getMyProfile,login,logout,register } from "../controllers/user.controller.js";
import { isauthenticated } from "../middlewares/auth.js";


router.get('/me',isauthenticated,getMyProfile)
router.get('/logout',isauthenticated,logout)
router.post('/new',register);
router.post('/login',login);




export default router;