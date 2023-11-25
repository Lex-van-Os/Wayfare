// src/app.ts
import express from "express";
import sampleRoute from "./routes/sampleRoute";

const app = express();
const port = 5000;

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

app.use("/api", sampleRoute);

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
