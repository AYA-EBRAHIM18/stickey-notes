import { Router } from "express";
import { signIn, signUp } from "./user.controllers.js";
import { checkEmail } from "../../middleware/checkEmail.js";

const userRouter = Router();

userRouter.post("/signUp", checkEmail, signUp);
userRouter.post("/signIn", signIn);

export default userRouter;
