import express from "express";

import {
  getAllECGData,
  createECGData,
  getECGDatabyId,
} from "../controllers/ecgDataController"

const router = express.Router();

router.get('/', getAllECGData);
router.post('/', createECGData);
router.get('/:id', getECGDatabyId);

export default router;