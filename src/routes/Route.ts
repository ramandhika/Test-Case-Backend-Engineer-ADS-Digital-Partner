import { Router } from "express";
import {
  createCuti,
  updateCuti,
  deleteCuti,
  getAllCuti,
} from "../controllers/cutiController";

import {
  createKaryawan,
  updateKaryawan,
  deleteKaryawan,
  getAllKaryawan,
  getKaryawanWithCuti,
} from "../controllers/karyawanController";

const router = Router();

router.post("/cuti", createCuti);
router.put("/cuti/:nomorInduk", updateCuti);
router.delete("/cuti/:nomorInduk", deleteCuti);
router.get("/cuti", getAllCuti);

router.post("/karyawan", createKaryawan);
router.put("/karyawan/:nomorInduk", updateKaryawan);
router.delete("/karyawan/:nomorInduk", deleteKaryawan);
router.get("/karyawan", getAllKaryawan);
router.get("/karyawan/:nomorInduk", getKaryawanWithCuti);

export default router;
