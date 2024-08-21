import express from "express";
import karyawanRoutes from "./routes/karyawanRoutes";
import cutiRoutes from "./routes/cutiRoutes";

const app = express();
app.use(express.json());

app.use("/api/karyawan", karyawanRoutes);
app.use("/api/cuti", cutiRoutes);

export default app;
