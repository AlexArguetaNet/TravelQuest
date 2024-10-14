import { Router } from "express";
import { createAccount, login } from "../controllers/user.js";

const router = Router();

router.post("/login", login);
router.post("/create-account", createAccount);

export { router as userRouter };