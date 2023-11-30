// userRoutes.ts
import express from "express";
import {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
} from "../controllers/userController.ts";

const router = express.Router();

// Get all users
router.get("/", getUsers);

// Get a single user
router.get("/:id", getUser);

// Create a new user
router.post("/", createUser);

// Update a user
router.patch("/:id", updateUser);

// Delete a user
router.delete("/:id", deleteUser);

export default router;
