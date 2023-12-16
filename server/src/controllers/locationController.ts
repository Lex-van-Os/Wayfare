import { Request, Response, NextFunction } from "express";
import createHttpError from "http-errors";
import { LocationInterface, locationFilters } from "../models/location.ts";
import * as locationService from "../services/locationService.ts";
import { ObjectId } from "mongodb";

async function getLocations(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const { page = 1, limit = 10 } = req.query;

    const filters = Object.keys(req.query)
      .filter((key) => locationFilters.includes(key))
      .reduce(
        (obj, key) => {
          obj[key] = { $regex: req.query[key], $options: "i" };
          return obj;
        },
        {} as Record<string, any>
      );

    const locations = await locationService.getAllLocations(
      Number(page),
      Number(limit),
      filters
    );

    if (locations.length > 0) {
      res.status(200).json(locations);
    } else {
      console.log("Empty result");
      throw createHttpError(404, "No locations found");
    }
  } catch (error) {
    next(error);
  }
}

async function getLocation(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const locationId = req.params.id;
    const location = await locationService.getLocationById(locationId);

    if (location) {
      res.status(200).json(location);
    } else {
      console.log("Location not found");
      throw createHttpError(404, "Location not found");
    }
  } catch (error) {
    next(error);
  }
}

async function createLocation(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const locationData = req.body as LocationInterface;

    if (
      !locationData.name ||
      !locationData.description ||
      !locationData.startDate ||
      !locationData.endDate ||
      !locationData.notes ||
      !locationData.tripId
    ) {
      console.log("Missing required fields");
      throw createHttpError(400, "Missing required fields");
    }

    const newLocation = await locationService.createLocation(locationData);

    res.status(201).json(newLocation);
  } catch (error) {
    next(error);
  }
}

async function updateLocation(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const locationId = req.params.id;

    if (!ObjectId.isValid(locationId)) {
      console.log("Invalid document id");
      throw createHttpError(400, "Invalid document id");
    }

    const locationData: LocationInterface = req.body;
    const updatedLocation = await locationService.updateLocation(
      locationId,
      locationData
    );

    if (updatedLocation) {
      res.status(200).json(updateLocation);
    } else {
      console.log("Location not found");
      throw createHttpError(404, "Location not found");
    }
  } catch (error) {
    next(error);
  }
}

async function deleteLocation(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const locationId = req.params.id;
    const deletedLocation = await locationService.deleteLocation(locationId);

    if (deletedLocation) {
      res.status(200).json(deletedLocation);
    } else {
      console.log("Location not found");
      throw createHttpError(404, "Location not found");
    }
  } catch (error) {
    next(error);
  }
}

export {
  getLocations,
  getLocation,
  createLocation,
  updateLocation,
  deleteLocation,
};
