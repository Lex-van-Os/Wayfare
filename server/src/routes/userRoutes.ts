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
/**
 * @swagger
 * /api/users/{start}/{limit}:
 *   get:
 *     summary: Get all users
 *     parameters:
 *       - in: path
 *         name: start
 *         required: true
 *         description: The start index of the users to retrieve.
 *         schema:
 *           type: integer
 *       - in: path
 *         name: limit
 *         required: true
 *         description: The maximum number of users to retrieve.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: OK
 */
router.get("/:start/:limit", getUsers);

// Get a single user
/**
 * @swagger
 * /api/users/{id}:
 *   get:
 *     summary: Get a single user
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the user to retrieve.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: OK
 *       404:
 *         description: User not found
 */
router.get("/:id", validatePathId, getUser);

// Create a new user
/**
 * @swagger
 * /api/users:
 *   post:
 *     summary: Create a new user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       201:
 *         description: User created
 *       400:
 *         description: Invalid request body
 */
router.post("/", validateUserCreate, createUser);

// Update a user
/**
 * @swagger
 * /api/users/{id}:
 *   patch:
 *     summary: Update a user
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the user to update.
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: User updated
 *       400:
 *         description: Invalid request body
 *       404:
 *         description: User not found
 */
router.patch("/:id", validatePathId, validateUserUpdate, updateUser);

// Delete a user
/**
 * @swagger
 * /api/users/{id}:
 *   delete:
 *     summary: Delete a user
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the user to delete.
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: User deleted
 *       404:
 *         description: User not found
 */
router.delete("/:id", validatePathId, deleteUser);

// OPTIONS request handling
router.options("/", handleOptions);
router.options("/:id", handleOptions);

/**
 * Handles the OPTIONS request for user routes.
 * Sets the necessary headers for CORS (Cross-Origin Resource Sharing).
 * @param req - The request object.
 * @param res - The response object.
 */
function handleOptions(req: Request, res: Response) {
  res.setHeader("Allow", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.sendStatus(200);
}

export default router;
