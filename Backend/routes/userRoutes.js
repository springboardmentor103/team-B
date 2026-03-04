import { Router } from "express";
import { getMe, getDashboard, updateProfile } from "../controllers/userController.js";
import authorize from "../middleware/auth.js";

const router = Router();

router.get("/me", authorize, getMe);
router.get("/dashboard", authorize, getDashboard);
router.put("/update-profile", authorize, updateProfile);

export default router;

