import express from "express";
import { getIndex } from "../controllers/index.js";
const router = express.Router();

router.get("/api", getIndex);

export default router;
