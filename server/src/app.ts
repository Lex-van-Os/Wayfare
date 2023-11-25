import "dotenv/config";
import express from "express";
import sampleRoute from "./routes/sampleRoute";
import "mongodb";

const app = express();

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

app.use("/api", sampleRoute);

export default app;
