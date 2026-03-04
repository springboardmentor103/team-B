import { Router } from "express";
import authorize from "../middleware/auth.js";
import {
  createTask,
  getViewTasks,
  getUserTasks,
  updateTask,
  deleteTask,
  completeTask
} from "../controllers/taskController.js";

const router = Router();

router.post("/create-task", authorize, createTask);
router.get("/view-tasks", authorize, getViewTasks);
router.get("/user-tasks", authorize, getUserTasks);
router.put("/update-task/:id", authorize, updateTask);
router.delete("/delete-task/:id", authorize, deleteTask);
router.patch("/task/:id/complete", authorize, completeTask);

export default router;

