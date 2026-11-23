import express from "express";
import {
  createTodo,
  deleteTask,
  getTodo,
  updateTask,
} from "../controllers/todoController.ts";

const todoRoute = express.Router();
todoRoute.post("/create", createTodo);
todoRoute.get("/getAll", getTodo);
todoRoute.put("/update/:id", updateTask);
todoRoute.delete("/delete/:id", deleteTask);

export default todoRoute;
