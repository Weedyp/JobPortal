import express from "express";
import { updateProfile, login, register,logout } from "../controllers/user.controller.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import { singleUpload } from "../middlewares/multer.js";
const router = express.Router();

//router.route(path).method(controller)
router.route('/register').post(singleUpload,register);
router.route("/login").post(singleUpload,login);
router.route("/profile/update").post(singleUpload,isAuthenticated, updateProfile);
router.route("/logout").get(logout);

export default router;
