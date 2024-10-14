import { Router } from "express";
import { createAccount } from "../controllers/user.js";

const router = Router();

router.post("/create-account", createAccount);

export { router as userRouter };