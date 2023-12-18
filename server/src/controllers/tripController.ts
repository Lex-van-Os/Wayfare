import { Request, Response, NextFunction } from "express";
import createHttpError from "http-errors";
import { TripInterface, tripFilters } from "../models/trip.ts";
import * as tripService from "../services/tripService.ts";
import { ObjectId } from "mongodb";
import { createFilterModel } from "../util/helpers.ts";

/**
 * Get all trips with optional pagination and filtering.
 * @param req - Express Request object
 * @param res - Express Response object
 * @param next - Express NextFunction
 * @returns Promise<void>
 */
async function getTrips(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    // Extract the optional query parameters from the request. Else: default value
    const { page = 1, limit = 10 } = req.query;
    // Extract the optional filter values from the request. Filters are used as .include() functionality.
    const filters = createFilterModel(req.query);

    const trips = await tripService.getAllTrips(
      Number(page),
      Number(limit),
      filters
    );

    if (trips.length > 0) {
      res.status(200).json(trips);
    } else {
      console.log("Empty result");
      throw createHttpError(404, "No trips found");
    }
  } catch (error) {
    next(error);
  }
}

/**
 * Get a trip by its ID.
 * @param req - Express Request object
 * @param res - Express Response object
 * @param next - Express NextFunction
 * @returns Promise<void>
 */
async function getTrip(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const tripId = req.params.id;
    const trip = await tripService.getTripById(tripId);

    if (trip) {
      res.status(200).json(trip);
    } else {
      console.log("Trip not found");
      throw createHttpError(404, "Trip not found");
    }
  } catch (error) {
    next(error);
  }
}

/**
 * Create a new trip.
 * @param req - Express Request object
 * @param res - Express Response object
 * @param next - Express NextFunction
 * @returns Promise<void>
 */
async function createTrip(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const tripData = req.body as TripInterface;

    const newTrip = await tripService.createTrip(tripData);

    res.status(201).json(newTrip);
  } catch (error) {
    next(error);
  }
}

/**
 * Update a trip by its ID.
 * @param req - Express Request object
 * @param res - Express Response object
 * @param next - Express NextFunction
 * @returns Promise<void>
 */
async function updateTrip(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const tripId = req.params.id;

    if (!ObjectId.isValid(tripId)) {
      console.log("Invalid document id");
      throw createHttpError(400, "Invalid document id");
    }

    const tripData: TripInterface = req.body;
    const updatedTrip = await tripService.updateTrip(tripId, tripData);

    if (updatedTrip) {
      res.status(200).json(updatedTrip);
    } else {
      console.log("Trip not found");
      throw createHttpError(404, "Trip not found");
    }
  } catch (error) {
    next(error);
  }
}

/**
 * Delete a trip by its ID.
 * @param req - Express Request object
 * @param res - Express Response object
 * @param next - Express NextFunction
 * @returns Promise<void>
 */
async function deleteTrip(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const tripId = req.params.id;
    const deletedTrip = await tripService.deleteTrip(tripId);

    if (deletedTrip) {
      res.status(200).json(deletedTrip);
    } else {
      console.log("Trip not found");
      throw createHttpError(404, "Trip not found");
    }
  } catch (error) {
    next(error);
  }
}

export { getTrips, getTrip, createTrip, updateTrip, deleteTrip };
