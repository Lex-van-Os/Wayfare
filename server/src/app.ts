import "dotenv/config";
import express from "express";
import morgan from "morgan";
import "mongodb";
import userRoutes from "./routes/userRoutes.ts";
import createHttpError, { isHttpError } from "http-errors";

const app = express();

app.use(morgan("dev"));

app.use(express.json());

app.get("/", async (req, res, next) => {
  try {
    res.send("Hello, World!");
  } catch (error) {
    next(error);
  }
});

app.use("/api/users", userRoutes);

app.use((req, res, next) => {
  next(createHttpError(404, "Endpoint or page not found"));
});

app.use(
  (
    error: unknown,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    console.log("Logging error");
    console.error(error);
    let errorMessage =
      "An unknown error occurred while processing the request.";
    let statusCode = 500;

    if (isHttpError(error)) {
      errorMessage = error.message;
      statusCode = error.statusCode;
    }

    res.status(statusCode).json({ error: errorMessage });
  }
);

export default app;
