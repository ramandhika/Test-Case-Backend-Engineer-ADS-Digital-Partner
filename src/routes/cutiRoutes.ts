import { Router } from "express";
import {
  createCuti,
  updateCuti,
  deleteCuti,
  getAllCuti,
} from "../controllers/cutiController";

const router = Router();

router.post("/", createCuti);
router.put("/:id", updateCuti);
router.delete("/:id", deleteCuti);
router.get("/", getAllCuti);

export default router;
