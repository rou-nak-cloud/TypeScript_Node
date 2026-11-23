import mongoose, { Schema } from "mongoose";

interface Todo {
  title: string;
}

const todoSchema = new Schema<Todo>(
  {
    title: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

export const todoModel = mongoose.model("todo", todoSchema);
