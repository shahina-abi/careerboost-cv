import express from "express";
import { userLogin,userLogout,userSignup,getProfile,editProfile } from "../../controllers/userController.js";
import { authUser } from "../../middleware/authUser.js";

const userRouter = express.Router();

userRouter.post("/login", userLogin);
userRouter.post("/signup", userSignup);
userRouter.post("/logout", userLogout);
userRouter.get("/profile", authUser, getProfile);
userRouter.put("/edit", authUser, editProfile);

export default userRouter;