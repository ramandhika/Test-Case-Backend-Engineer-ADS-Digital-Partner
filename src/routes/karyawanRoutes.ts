import { Router } from "express";
import {
  createKaryawan,
  updateKaryawan,
  deleteKaryawan,
  getAllKaryawan,
  getKaryawanWithCuti,
} from "../controllers/karyawanController";

const router = Router();

router.post("/", createKaryawan);
router.put("/:id", updateKaryawan);
router.delete("/:id", deleteKaryawan);
router.get("/", getAllKaryawan);
router.get("/:nomorInduk", getKaryawanWithCuti);

export default router;
