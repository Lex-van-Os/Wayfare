import Joi from "joi";
import { Request, Response, NextFunction } from "express";
import { paginationSchema } from "./sharedMiddleware.ts";

const createUserSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  age: Joi.number().required(),
  password: Joi.string().required(),
  createdAt: Joi.date().required(),
  updatedAt: Joi.date().required(),
});

const updateUserSchema = Joi.object({
  name: Joi.string().optional(),
  email: Joi.string().optional(),
  age: Joi.number().optional(),
  password: Joi.string().optional(),
  createdAt: Joi.date().optional(),
  updatedAt: Joi.date().optional(),
}).min(1);

const userPaginationSchema = paginationSchema.concat(
  Joi.object({
    name: Joi.string().optional(),
    email: Joi.string().optional(),
    age: Joi.number().optional(),
    password: Joi.string().optional(),
    createdAt: Joi.date().optional(),
    updatedAt: Joi.date().optional(),
  })
);

export function validateUserCreate(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { error } = createUserSchema.validate(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }
  next();
}

export function validateUserUpdate(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { error } = updateUserSchema.validate(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }
  next();
}

export function validateUserPagination(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { error } = userPaginationSchema.validate(req.query);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }
  next();
}
