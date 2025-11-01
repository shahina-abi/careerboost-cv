import express from "express";
import { userLogin,userLogout,userSignup,getProfile,editProfile ,deleteAccount} from "../../controllers/userController.js";
import { authUser } from "../../middleware/authUser.js";

const userRouter = express.Router();

userRouter.post("/login", userLogin);
userRouter.post("/signup", userSignup);
userRouter.post("/logout", userLogout);
userRouter.get("/me", authUser, getProfile);
userRouter.put("/edit", authUser, editProfile);
userRouter.delete('/delete',deleteAccount)

export default userRouter;