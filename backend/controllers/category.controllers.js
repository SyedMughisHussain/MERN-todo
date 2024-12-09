import Category from "../models/category.model.js";

const createCategory = async (req, res) => {
  const userId  = req.user;
  const { name } = req.body;

  try {
    const existingCategory = await Category.findOne({ name });

    if (existingCategory) {
      return res.status(400).json({ message: "Category already exists" });
    }

    const category = await Category.create({ name, userId });

    res.status(201).json({ error: false, message: "Category created successfully", success: true, category });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: error.message,
      success: false,
      category: null,
      message: "Server error, failed to create category",
    });
  }
};

const getCategories = async (req, res) => {
  const userId  = req.user;
  try {
    const categories = await Category.find({ userId });
    res.status(200).json({
      error: false,
      message: "Categories fetched successfully",
      success: true,
      categories,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: error.message,
      success: false,
      categories: null,
      message: "Server error, failed to fetch categories",
    });
  }
};

const getCategoryById = async (req, res) => {
  const { id } = req.params;

  try {
    const category = await Category.findById(id);

    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    res.status(200).json({
      error: false,
      message: "Category fetched successfully",
      success: true,
      category,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: error.message,
      success: false,
      category: null,
      message: "Server error, failed to fetch category",
    });
  }
};

const updateCategory = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  try {
    const updatedCategory = await Category.findByIdAndUpdate(id, { name }, { new: true });

    if (!updatedCategory) {
      return res.status(404).json({ message: "Category not found" });
    }

    res.status(200).json({
      success: true,
      error: false,
      message: "Category updated successfully",
      category: updatedCategory,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: error.message,
      success: false,
      category: null,
      message: "Server error, failed to update category",
    });
  }
};

const deleteCategory = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedCategory = await Category.findByIdAndDelete(id);

    if (!deletedCategory) {
      return res.status(404).json({ message: "Category not found" });
    }

    res.status(200).json({
      success: true,
      error: false,
      deleteCategory: deletedCategory,
      message: "Category deleted successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: error.message,
      success: false,
      deleteCategory: null,
      message: "Server error, failed to delete category",
    });
  }
};

const getCategoryByUserId = async (req, res) => {
  const userId = req.user;

  try {
    const userCategories = await Category.find({ _id: userId });
    res.status(200).json({ success: true, message: "Categories fetched successfully", categories: userCategories });
  } catch (error) {
    res.status(400).json({ message: error.message, success: false });
  }
};

export { createCategory, getCategories, updateCategory, deleteCategory, getCategoryById, getCategoryByUserId };
