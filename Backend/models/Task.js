import mongoose from "mongoose";

const taskSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    title: { type: String, required: true },
    description: String,
    location: String,
    start_time: Date,
    end_time: Date,
    status: { type: String, default: "planned" }
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

taskSchema.virtual("hours").get(function () {
  if (this.start_time && this.end_time) {
    const ms = this.end_time - this.start_time;
    return Math.round(ms / (1000 * 60 * 60));
  }
  return 0;
});

const Task = mongoose.model("Task", taskSchema);

export default Task;

