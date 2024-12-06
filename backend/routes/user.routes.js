import express from "express";
import { verifyToken } from "../middleware/middleware.js";

import { signup, signin, getLoggedInUser } from "../controllers/user.controllers.js";

const router = express.Router();

router.route("/signup").post(signup);
router.route("/signin").post(signin);
router.route("/me").get(verifyToken, getLoggedInUser);

export default router;
