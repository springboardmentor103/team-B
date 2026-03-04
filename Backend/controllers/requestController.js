import Request from "../models/Request.js";
import Task from "../models/Task.js";
import Notification from "../models/Notification.js";

export const getUserRequests = async (req, res) => {
  res.status(200).json({ msg: "Empty" });
};

export const sendRequest = async (req, res) => {
  const { taskId, message } = req.body;

  const task = await Task.findById(taskId);
  if (!task) {
    return res.status(400).json({ message: "Task not available" });
  }

  if (task.userId.toString() === req.userId) {
    return res.status(400).json({ message: "Cannot request your own task" });
  }

  const existing = await Request.findOne({
    taskId,
    requesterId: req.userId
  });

  if (existing) {
    return res.status(409).json({ message: "Request already sent" });
  }

  const request = await Request.create({
    taskId,
    requesterId: req.userId,
    taskOwnerId: task.userId,
    message: message || "I'd like to help with this task",
    status: "pending"
  });

  await request.save();

  if (task.userId.toString() !== req.userId) {
    await Notification.create({
      userId: task.userId,
      type: "TASK_REQUEST",
      message: `${req.userId} has requested to help with your task`,
      relatedTask: taskId
    });
  }

  res.status(201).json({ message: "Request sent", request });
};

export const getReceivedRequests = async (req, res) => {
  try {
    const requests = await Request.find({ taskOwnerId: req.userId })
      .populate("taskId", "title")
      .populate("requesterId", "name email");

    res.json(requests);
  } catch (error) {
    res.status(500).json({ message: "Error fetching received requests" });
  }
};

export const getMyRequests = async (req, res) => {
  try {
    const requests = await Request.find({
      requesterId: req.userId
    })
      .populate("taskId")
      .populate("taskOwnerId", "email name");

    res.json({ requests });
  } catch (error) {
    res.status(500).json({ message: "Error fetching my requests" });
  }
};

export const updateRequestStatus = async (req, res) => {
  const { status } = req.body;

  const request = await Request.findById(req.params.id);

  if (!request || request.taskOwnerId.toString() !== req.userId) {
    return res.status(403).json({ message: "Unauthorized" });
  }

  request.status = status;
  await request.save();

  if (status === "accepted") {
    await Notification.create({
      userId: request.requesterId,
      type: "TASK_ACCEPTED",
      message: "Your request was accepted 🎉",
      relatedTask: request.taskId
    });
  }

  if (status === "rejected") {
    await Notification.create({
      userId: request.requesterId,
      type: "TASK_REJECTED",
      message: "Your task request has been rejected",
      relatedTask: request.taskId
    });
  }

  res.json({ message: "Request updated", request });
};

