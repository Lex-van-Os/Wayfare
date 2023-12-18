import express from "express";
import {
  getLocation,
  getLocations,
  createLocation,
  updateLocation,
  deleteLocation,
} from "../controllers/locationController.ts";
import {
  validateLocationCreate,
  validateLocationUpdate,
  validateLocationPagination,
} from "../middleware/locationMiddleware.ts";

import { validatePathId } from "../middleware/sharedMiddleware.ts";

const router = express.Router();

// Get all locations
/**
 * @swagger
 * /api/locations:
 *   get:
 *     summary: Get all locations
 *     description: Retrieve a list of all locations
 *     responses:
 *       200:
 *         description: Successful operation
 *       500:
 *         description: Internal server error
 */
router.get("", validateLocationPagination, getLocations);

// Get a single location
/**
 * @swagger
 * /api/locations/{id}:
 *   get:
 *     summary: Get a single location
 *     description: Retrieve a single location by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the location
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successful operation
 *       404:
 *         description: Location not found
 *       500:
 *         description: Internal server error
 */
router.get("/:id", validatePathId, getLocation);

// Create a new location
/**
 * @swagger
 * /api/locations:
 *   post:
 *     summary: Create a new location
 *     description: Create a new location
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Location'
 *     responses:
 *       201:
 *         description: Location created
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal server error
 */
router.post("/", validateLocationCreate, createLocation);

// Update a location
/**
 * @swagger
 * /api/locations/{id}:
 *   patch:
 *     summary: Update a location
 *     description: Update a location by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the location
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Location'
 *     responses:
 *       200:
 *         description: Location updated
 *       400:
 *         description: Bad request
 *       404:
 *         description: Location not found
 *       500:
 *         description: Internal server error
 */
router.patch("/:id", validatePathId, validateLocationUpdate, updateLocation);

// Delete a location
/**
 * @swagger
 * /api/locations/{id}:
 *   delete:
 *     summary: Delete a location
 *     description: Delete a location by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the location
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Location deleted
 *       404:
 *         description: Location not found
 *       500:
 *         description: Internal server error
 */
router.delete("/:id", validatePathId, deleteLocation);

export default router;
