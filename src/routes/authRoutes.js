import express from "express";
import { catchHandler } from "../utils/catchHandler.js";
import { getProfile, login } from "../controller/auth/index.js";
import { tokenValidater } from "../middleware/validateToken.js";


const router = express.Router();

router.post("/login", catchHandler(login));
router.get("/profile", catchHandler(tokenValidater), catchHandler(getProfile));

export default router;