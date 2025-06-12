import express from "express";
import * as articleController from "../controllers/articleController";
import { requireAuth } from "../middleware/authValidation";

const router = express.Router();

router.get("/articles", requireAuth, articleController.getArticles);
// router.get('/sources', articleController.getSources);

export default router;
