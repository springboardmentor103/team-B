import { Router } from "express";
import authorize from "../middleware/auth.js";
import {
  getNotifications,
  markNotificationRead
} from "../controllers/notificationController.js";

const router = Router();

router.get("/getNotifications", authorize, getNotifications);
router.patch("/notifications/:id/read", authorize, markNotificationRead);

export default router;

