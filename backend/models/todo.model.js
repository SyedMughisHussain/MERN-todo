import mongoose, { Schema } from "mongoose";

const todoSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      minlength: [3, "Title must be at least 3 characters long"],
    },
    description: {
      type: String,
      required: true,
      minlength: [5, "Description must be at least 5 characters long"],
    },
    status: {
      type: String,
      default: "Not Started",
      enum: ["Not Started", "In Progress", "Completed"],
    },
    priority: {
      type: String,
      default: "Moderate",
      enum: ["Low", "Moderate", "Low"],
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Todo = mongoose.model("Todo", todoSchema);
export default Todo;
