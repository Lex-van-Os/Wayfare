import express from "express";
import {
  getLocation,
  getLocations,
  createLocation,
  updateLocation,
  deleteLocation,
} from "../controllers/locationController.ts";

const router = express.Router();

// Get all locations
router.get("", getLocations);

// Get a single location
router.get("/:id", getLocation);

// Create a new location
router.post("/", createLocation);

// Update a location
router.patch("/:id", updateLocation);

// Delete a location
router.delete("/:id", deleteLocation);

export default router;
