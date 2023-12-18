import Joi from "joi";
import { Request, Response, NextFunction } from "express";
import { paginationSchema } from "./sharedMiddleware.ts";

const createTripSchema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().required(),
  startDate: Joi.date().required(),
  endDate: Joi.date().required(),
  userId: Joi.string().required(),
});

const updateTripSchema = Joi.object({
  title: Joi.string().optional(),
  description: Joi.string().optional(),
  startDate: Joi.date().optional(),
  endDate: Joi.date().optional(),
  userId: Joi.string().optional(),
}).min(1);

const tripPaginationSchema = paginationSchema.concat(
  Joi.object({
    title: Joi.string().optional(),
    description: Joi.string().optional(),
    startDate: Joi.string().optional(),
    endDate: Joi.string().optional(),
    userId: Joi.string().optional(),
  })
);

export function validateTripCreate(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { error } = createTripSchema.validate(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }
  next();
}

export function validateTripUpdate(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { error } = updateTripSchema.validate(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }
  next();
}

export function validateTripPagination(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { error } = tripPaginationSchema.validate(req.query);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }
  next();
}
