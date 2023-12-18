import express from "express";
import {
  getTrips,
  getTrip,
  createTrip,
  updateTrip,
  deleteTrip,
} from "../controllers/tripController.ts";
import {
  validateTripCreate,
  validateTripUpdate,
  validateTripPagination,
} from "../middleware/tripMiddleware.ts";

import { validatePathId } from "../middleware/sharedMiddleware.ts";

const router = express.Router();

/**
 * @swagger
 * /api/trips:
 *   get:
 *     summary: Get all trips
 *     responses:
 *       200:
 *         description: Returns all trips
 */
router.get("", validateTripPagination, getTrips);

/**
 * @swagger
 * /api/trips/{id}:
 *   get:
 *     summary: Get a single trip
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Returns the trip with the specified id
 *       404:
 *         description: Trip not found
 */
router.get("/:id", validatePathId, getTrip);

/**
 * @swagger
 * /api/trips:
 *   post:
 *     summary: Create a new trip
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Trip'
 *     responses:
 *       201:
 *         description: Trip created successfully
 *       400:
 *         description: Invalid request body
 */
router.post("/", validateTripCreate, createTrip);

/**
 * @swagger
 * /api/trips/{id}:
 *   patch:
 *     summary: Update a trip
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Trip'
 *     responses:
 *       200:
 *         description: Trip updated successfully
 *       400:
 *         description: Invalid request body
 *       404:
 *         description: Trip not found
 */
router.patch("/:id", validatePathId, validateTripUpdate, updateTrip);

/**
 * @swagger
 * /api/trips/{id}:
 *   delete:
 *     summary: Delete a trip
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Trip deleted successfully
 *       404:
 *         description: Trip not found
 */
router.delete("/:id", validatePathId, deleteTrip);

export default router;
