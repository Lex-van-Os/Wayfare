import express, { Request, Response } from "express";
import {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
} from "../controllers/userController.ts";
import {
  validateUserCreate,
  validateUserUpdate,
  validateUserPagination,
} from "../middleware/userMiddleware.ts";

import { validatePathId } from "../middleware/sharedMiddleware.ts";

const router = express.Router();

// Get all users
router.get("/:start/:limit", getUsers);

// Get a single user
router.get("/:id", validatePathId, getUser);

// Create a new user
router.post("/", validateUserCreate, createUser);

// Update a user
router.patch("/:id", validatePathId, validateUserUpdate, updateUser);

// Delete a user
router.delete("/:id", validatePathId, deleteUser);

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
