import "dotenv/config";
import express from "express";
import morgan from "morgan";
import "mongodb";
import cors from "cors";
import userRoutes from "./routes/userRoutes.ts";
import createHttpError, { isHttpError } from "http-errors";

const app = express();

app.use(
  cors({
    methods: "GET, POST, PUT, DELETE",
  })
);

app.use(express.urlencoded({ extended: true }));

app.use(morgan("dev"));
app.use(express.json());

// Middleware configuration for enforcing specific content type
app.use((req, res, next) => {
  if (req.get("Accept") !== "application/json") {
    return res.status(406).send("Not Acceptable");
  }

  if (req.method === "POST" && req.get("Content-Type") !== "application/json") {
    return res.status(415).send("Unsupported Media Type");
  }

  // Continue to the next middleware
  next();
});

app.use("/api/users", userRoutes);

app.get("/", async (req, res, next) => {
  try {
    res.send("Hello, World!");
  } catch (error) {
    next(error);
  }
});

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

    next();
  }
);

export default app;
