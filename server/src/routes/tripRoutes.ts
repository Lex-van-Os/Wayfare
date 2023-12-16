import express from "express";
import {
  getTrips,
  getTrip,
  createTrip,
  updateTrip,
  deleteTrip,
} from "../controllers/tripController.ts";

const router = express.Router();

// Get all trips
router.get("", getTrips);

// Get a single trip
router.get("/:id", getTrip);

// Create a new trip
router.post("/", createTrip);

// Update a trip
router.patch("/:id", updateTrip);

// Delete a trip
router.delete("/:id", deleteTrip);

export default router;
