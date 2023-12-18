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
router.get("", validateLocationPagination, getLocations);

// Get a single location
router.get("/:id", validatePathId, getLocation);

// Create a new location
router.post("/", validateLocationCreate, createLocation);

// Update a location
router.patch("/:id", validatePathId, validateLocationUpdate, updateLocation);

// Delete a location
router.delete("/:id", validatePathId, deleteLocation);

export default router;
