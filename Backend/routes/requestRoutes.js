import { Router } from "express";
import authorize from "../middleware/auth.js";
import {
  getUserRequests,
  sendRequest,
  getReceivedRequests,
  getMyRequests,
  updateRequestStatus
} from "../controllers/requestController.js";

const router = Router();

router.get("/user-requests", authorize, getUserRequests);
router.post("/send-request", authorize, sendRequest);
router.get("/received-requests", authorize, getReceivedRequests);
router.get("/my-request", authorize, getMyRequests);
router.patch("/request/:id", authorize, updateRequestStatus);

export default router;

