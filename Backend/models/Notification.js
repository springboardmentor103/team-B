import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    type: {
      type: String,
      enum: ["TASK_REQUEST", "TASK_ACCEPTED", "TASK_REJECTED"],
      required: true
    },
    message: { type: String, required: true },
    isRead: { type: Boolean, default: false },
    relatedTask: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Task"
    }
  },
  { timestamps: true }
);

const Notification = mongoose.model("Notification", notificationSchema);

export default Notification;

