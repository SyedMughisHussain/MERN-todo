import express from "express";
import {verifyToken } from "../middleware/middleware.js";

import { createCategory, deleteCategory, getCategories, getCategoryById, updateCategory, getCategoryByUserId } from "../controllers/category.controllers.js";

const router = express.Router();

router.route("/createCategory").post(createCategory);
router.route("/getCategories").get(getCategories);
router.route("/getCategoryById/:id").get(getCategoryById);
router.route("/updateCategory/:id").put(updateCategory);
router.route("/deleteCategory/:id").delete(deleteCategory);
router.route("/getCategoriesByLoggedInUser").get(verifyToken, getCategoryByUserId);

export default router;
