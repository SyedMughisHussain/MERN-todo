import Todo from "../models/todo.model.js";

const createTodo = async (req, res) => {
  const userId = req.user;
  const { title, description, status, priority, category } = req.body;

  try {
    const newTodo = await Todo.create({
      title,
      description,
      status,
      priority,
      category,
      userId: userId,
    });

    res.status(201).json({
      success: true,
      error: false,
      message: "Todo created successfully",
      todo: newTodo,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      error: error.message,
      message: "Server error, failed to create todo",
    });
  }
};

const updateTodoById = async (req, res) => {
  const { id } = req.params;
  const { title, description, status, priority, category } = req.body;

  try {
    const updatedTodo = await Todo.findByIdAndUpdate(id, { title, description, status, priority, category }, { new: true });

    if (!updatedTodo) {
      return res.status(404).json({ message: "Todo not found" });
    }

    res.status(200).json({
      success: true,
      error: false,
      message: "Todo updated successfully",
      todo: updatedTodo,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      error: error.message,
      message: "Server error, failed to update todo",
    });
  }
};

const deleteTodo = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedTodo = await Todo.findByIdAndDelete(id);

    if (!deletedTodo) {
      return res.status(404).json({ message: "Todo not found" });
    }

    res.status(200).json({
      success: true,
      error: false,
      deletedTodo,
      message: "Todo deleted successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      error: error.message,
      message: "Server error, failed to delete todo",
    });
  }
};

const getTodos = async (req, res) => {
  const { userId } = req.user;
  try {
    const todos = await Todo.find({ userId });

    res.status(200).json({
      success: true,
      error: false,
      todos,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      error: error.message,
      message: "Server error, failed to fetch todos",
    });
  }
};

const getTodoById = async (req, res) => {
  const { id } = req.params;

  try {
    const todo = await Todo.findById(id);

    if (!todo) {
      return res.status(404).json({ message: "Todo not found" });
    }

    res.status(200).json({
      success: true,
      error: false,
      todo,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      error: error.message,
      message: "Server error, failed to fetch todo",
    });
  }
};

export { createTodo, updateTodoById, deleteTodo, getTodos, getTodoById };
