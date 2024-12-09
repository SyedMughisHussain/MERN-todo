import express from "express";

import { verifyToken } from "../middleware/middleware.js";
import { createTodo, deleteTodo, getTodos, getTodoById, updateTodoById } from "../controllers/todo.controllers.js";

const router = express.Router();

router.route("/createTodo").post(verifyToken, createTodo);
router.route("/getTodos").get(verifyToken, getTodos);
router.route("/deleteTodo/:id").delete(verifyToken, deleteTodo);
router.route("/getTodoById/:id").get(verifyToken, getTodoById);
router.route("/updateTodoById/:id").put(verifyToken, updateTodoById);

export default router;
