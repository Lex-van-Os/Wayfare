import "dotenv/config";
import express from "express";
import sampleRoute from "./routes/sampleRoute.ts";
import "mongodb";
import userRoutes from "./routes/userRoutes.ts";

const app = express();

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

app.use("/api/users", userRoutes);

app.use("/api", sampleRoute);

export default app;
