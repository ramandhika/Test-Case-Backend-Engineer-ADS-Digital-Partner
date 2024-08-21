import express from "express";
import Route from "./routes/Route";

const app = express();
app.use(express.json());

app.use("/api", Route);
export default app;
