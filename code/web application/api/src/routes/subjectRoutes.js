import express from "express";

import {
  getAllSubjects,
  createSubject,
  getSubjectbyId,
} from "../controllers/subjectController"

const router = express.Router();

router.get('/', getAllSubjects);
router.post('/', createSubject);
router.get('/:id', getSubjectbyId);

export default router;