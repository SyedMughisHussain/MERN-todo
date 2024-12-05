import express from "express";

import { createCategory, deleteCategory, getCategories, getCategoryById, updateCategory } from "../controllers/category.controllers.js";

const router = express.Router();

router.route("/createCategory").post(createCategory);
router.route("/getCategories").get(getCategories);
router.route("/getCategoryById/:id").get(getCategoryById);
router.route("/updateCategory/:id").put(updateCategory);
router.route("/deleteCategory/:id").delete(deleteCategory);

export default router;
