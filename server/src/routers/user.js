import { Router } from "express";
import { createAccount, getUser, login } from "../controllers/user.js";
import { authenticateToken } from "../middleware/utilities.js";

const router = Router();

router.post("/login", login);
router.post("/create-account", createAccount);
router.get("/get-user", authenticateToken, getUser);

export { router as userRouter };