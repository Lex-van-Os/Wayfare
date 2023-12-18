import Joi from "joi";
import { Request, Response, NextFunction } from "express";

export const paginationSchema = Joi.object({
  page: Joi.number().integer().min(1).optional(),
  limit: Joi.number().integer().min(1).optional(),
}).unknown(false);

export const idPathSchema = Joi.object({
  id: Joi.string()
    .regex(/^[0-9a-fA-F]{24}$/)
    .required(),
});

export function validatePagination(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { error } = paginationSchema.validate(req.query);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }
  next();
}

export function validatePathId(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { error } = idPathSchema.validate(req.params);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }
  next();
}
