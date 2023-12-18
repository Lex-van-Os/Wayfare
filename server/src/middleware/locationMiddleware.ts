import Joi from "joi";
import { Request, Response, NextFunction } from "express";
import { paginationSchema } from "./sharedMiddleware.ts";

const createLocationSchema = Joi.object({
  name: Joi.string().required(),
  description: Joi.string().required(),
  startDate: Joi.date().required(),
  endDate: Joi.date().required(),
  notes: Joi.string().required(),
  tripId: Joi.string().required(),
});

const updateLocationSchema = Joi.object({
  name: Joi.string().optional(),
  description: Joi.string().optional(),
  startDate: Joi.date().optional(),
  endDate: Joi.date().optional(),
  notes: Joi.string().optional(),
  tripId: Joi.string().optional(),
}).min(1);

const locationPaginationSchema = paginationSchema.concat(
  Joi.object({
    name: Joi.string().optional(),
    description: Joi.string().optional(),
    startDate: Joi.date().optional(),
    endDate: Joi.date().optional(),
    notes: Joi.string().optional(),
    tripId: Joi.string().optional(),
  })
);

export function validateLocationCreate(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { error } = createLocationSchema.validate(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }
  next();
}

export function validateLocationUpdate(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { error } = updateLocationSchema.validate(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }
  next();
}

export function validateLocationPagination(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { error } = locationPaginationSchema.validate(req.query);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }
  next();
}
