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

// Get all trips
router.get("", validateTripPagination, getTrips);

// Get a single trip
router.get("/:id", validatePathId, getTrip);

// Create a new trip
router.post("/", validateTripCreate, createTrip);

// Update a trip
router.patch("/:id", validatePathId, validateTripUpdate, updateTrip);

// Delete a trip
router.delete("/:id", validatePathId, deleteTrip);

export default router;
