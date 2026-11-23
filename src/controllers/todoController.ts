import type { Request, Response } from "express";
import { todoModel } from "../models/todoModel.ts";

export const createTodo = async (
  req: Request,
  res: Response,
): Promise<Response> => {
  try {
    const { title } = req.body;

    if (!title || !title.trim()) {
      return res.status(400).json({
        success: false,
        message: "Fields required.",
      });
    }

    const existTodo = await todoModel.findOne({ title:title.trim() });
    if (existTodo) {
      return res.status(400).json({
        success: false,
        message: "Fields required.",
      });
    }
    const todo = await todoModel.create({ title:title.trim() });
    return res.status(201).json({
      success: true,
      message: "Todo created.",
      data: todo,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `Internal server error.`,
    });
  }
};

export const getTodo = async (
  req: Request,
  res: Response,
): Promise<Response> => {
  try {
    const todo = await todoModel.find({});
    return res.status(200).json({
      success: true,
      message: todo.length === 0 ? "No todo to fetched" : "Todo fetched all.",
      data: todo,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `Internal server error.`,
    });
  }
};

export const deleteTask = async (
  req: Request,
  res: Response,
): Promise<Response> => {
  try {
    const id = req.params.id;
    if (!req.params.id) {
      return res.status(400).json({
        success: false,
        message: "task Id is required.",
      });
    }

    const deleteTaskPresent = await todoModel.findById(id);
    if (!deleteTaskPresent) {
      return res.status(400).json({
        success: false,
        message: `No task found in database.`,
      });
    }
    const deleteTask = await todoModel.findOneAndDelete({
      _id: id,
    });
    if (!deleteTask) {
      return res.status(400).json({
        success: false,
        message: `No permission to delete this todo..`,
      });
    }
    return res.status(200).json({
      success: true,
      message: `Task deleted successfully.`,
      data: deleteTask,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `Internal server error.`,
    });
  }
};

export const updateTask = async (
  req: Request,
  res: Response,
): Promise<Response> => {
  try {
    const id = req.params.id;
    const { title } = req.body;

    if (!title || !title.trim()) {
      return res.status(400).json({
        success: false,
        message: "Fields required.",
      });
    }
    if (!req.params.id) {
      return res.status(400).json({
        success: false,
        message: "task Id is required.",
      });
    }

    const existingTask = await todoModel.findById(id);
    if (!existingTask) {
      return res.status(400).json({
        success: false,
        message: `Todo not found to update.`,
      });
    } else if (existingTask.title === title.trim()) {
      return res.status(400).json({
        success: false,
        message: `Same title todo found.`,
        data: existingTask,
      });
    }

    const updateTask = await todoModel.findOneAndUpdate(
      { _id: id },
      { title:title.trim() },
      { new: true },
    );
    return res.status(201).json({
      success: true,
      message: `Task updated successfully.`,
      data: updateTask,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `Internal server error.`,
    });
  }
};
