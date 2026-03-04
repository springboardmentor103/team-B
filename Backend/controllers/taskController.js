import mongoose from "mongoose";
import Task from "../models/Task.js";

export const createTask = async (req, res) => {
  const { title, description, location, start_time, end_time } = req.body;

  try {
    const newTask = await Task.create({
      userId: req.userId,
      title,
      description,
      location,
      start_time,
      end_time
    });

    res.status(201).json({ message: "planned task added", task: newTask });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getViewTasks = async (req, res) => {
  try {
    const userId = new mongoose.Types.ObjectId(req.userId);

    const tasks = await Task.find({
      userId: { $ne: userId }
    });

    res.json({ tasks });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getUserTasks = async (req, res) => {
  const tasks = await Task.find({ userId: req.userId });
  res.status(200).json({ tasks });
};

export const updateTask = async (req, res) => {
  try {
    const task = await Task.findOneAndUpdate(
      { _id: req.params.id, userId: req.userId },
      req.body,
      { new: true }
    );

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    await task.save();

    res.json({ message: "Task updated successfully", task });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteTask = async (req, res) => {
  try {
    const task = await Task.findOneAndDelete({
      _id: req.params.id,
      userId: req.userId
    });

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.json({ message: "Task deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const completeTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) return res.status(404).json({ message: "Task not found" });

    if (task.userId.toString() !== req.userId) {
      return res.status(403).json({ message: "Not authorized" });
    }

    task.status = "completed";
    await task.save();

    res.json({ message: "Task marked as completed" });
  } catch (error) {
    res.status(500).json({ message: "Error updating task" });
  }
};

