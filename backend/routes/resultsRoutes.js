import express from "express";
import { saveResults, getResults, deleteResult } from "../controllers/resultsController.js";

const router = express.Router();

router.post("/saveResult", saveResults);
router.get("/getResults", getResults);
router.delete("/deleteResult/:id", deleteResult);

export default router;
