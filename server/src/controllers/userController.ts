import * as userService from "../services/userService.ts";
import { ObjectId } from "mongodb";
import createHttpError from "http-errors";
import { NextFunction } from "express";

async function getUsers(req: any, res: any, next: NextFunction) {
  try {
    const result = await userService.getAllUsers();

    if (result) {
      res.status(200).json(result);
    } else {
      console.log("Empty result");
      throw createHttpError(404, "No users found");
    }
  } catch (error) {
    next(error);
  }
}

async function getUser(req: any, res: any, next: NextFunction) {
  try {
    const userId = req.params.id;
    const user = await userService.getUserById(userId);

    if (user) {
      res.status(200).json(user);
    } else {
      console.log("User not found");
      throw createHttpError(404, "User not found");
    }
  } catch (error) {
    next(error);
  }
}

async function createUser(req: any, res: any, next: NextFunction) {
  try {
    const userData = req.body;
    const newUser = await userService.createUser(userData);

    res.status(201).json(newUser);
  } catch (error) {
    next(error);
  }
}

/**
 * Updates a user with the provided data.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Promise<void>} - A promise that resolves when the user is updated.
 */
async function updateUser(req: any, res: any, next: NextFunction) {
  try {
    console.log("Update user");
    const userId = req.params.id;

    if (!ObjectId.isValid(userId)) {
      console.log("Invalid document id");
      throw createHttpError(400, "Invalid document id");
    }

    const userData = req.body;
    const updatedUser = await userService.updateUser(userId, userData);

    if (updatedUser) {
      res.status(200).json(updatedUser);
    } else {
      console.log("User not found");
      throw createHttpError(404, "User not found");
    }
  } catch (error) {
    next(error);
  }
}

async function deleteUser(req: any, res: any, next: NextFunction) {
  try {
    const userId = req.params.id;
    const deletedUser = await userService.deleteUser(userId);

    if (deletedUser) {
      res.status(200).json(deletedUser);
    } else {
      console.log("User not found");
      throw createHttpError(404, "User not found");
    }
  } catch (error) {
    next(error);
  }
}

export { getUsers, getUser, createUser, updateUser, deleteUser };
