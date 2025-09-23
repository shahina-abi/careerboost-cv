import express from "express";
import { userLogin,userLogout,userSignup,getProfile,editProfile } from "../../controllers/userController.js";
import { authUser } from "../../middleware/authUser.js";

const router = express.Router();

router.post("/login", userLogin);
router.post("/signup", userSignup);
router.post("/logout", userLogout);
router.get("/profile", authUser, getProfile);
router.put("/edit", authUser, editProfile);

export default userRoutes;