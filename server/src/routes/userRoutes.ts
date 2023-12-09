import express, { Request, Response } from "express";
import {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
} from "../controllers/userController.ts";

const router = express.Router();

// Get all users
router.get("/:start/:limit", getUsers);

// Get a single user
router.get("/:id", getUser);

// Create a new user
router.post("/", createUser);

// Update a user
router.patch("/:id", updateUser);

// Delete a user
router.delete("/:id", deleteUser);

// OPTIONS request handling
router.options("/", handleOptions);
router.options("/:id", handleOptions);

function handleOptions(req: Request, res: Response) {
  res.setHeader("Allow", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.sendStatus(200);
}

export default router;
