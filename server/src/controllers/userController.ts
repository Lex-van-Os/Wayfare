import * as userService from "../services/userService.ts";
import { ObjectId } from "mongodb";
import createHttpError from "http-errors";
import { UserInterface } from "../models/user.ts";
import { Request, Response, NextFunction } from "express";
import createPagination from "../util/pagination.ts";

const selfUrl = "http://localhost:3000";

async function getUsers(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const start = parseInt(req.params.start) || 1;
    const limit = parseInt(req.params.limit) || 10;

    const users = await userService.getAllUsers(start, limit);

    if (users.length > 0) {
      const total = await userService.getTotalUserCount();
      const pagination = createPagination(total, start, limit);

      res.send({
        items: users.map((user) => ({
          _id: user._id,
          name: user.name,
          age: user.age,
          email: user.email,
          password: user.password,
          _links: {
            self: {
              href: `${selfUrl}/api/users/${user._id}`,
            },
            collection: {
              href: `${selfUrl}/api/users`,
            },
          },
        })),
        _links: {
          self: {
            href: `${selfUrl}/api/users`,
          },
        },
        pagination: {
          currentPage: pagination.currentPage,
          currentItems: pagination.currentItems,
          totalPages: pagination.numberOfPages,
          totalItems: total,
          _links: {
            first: {
              page: 1,
              href: `${selfUrl}/api/users${pagination.getFirstQueryString}`,
            },
            last: {
              page: pagination.numberOfPages,
              href: `${selfUrl}/api/users${pagination.getLastQueryString}`,
            },
            previous: {
              page: pagination.currentPage - 1,
              href: `${selfUrl}/api/users${pagination.getPreviousQueryString}`,
            },
            next: {
              page: pagination.currentPage + 1,
              href: `${selfUrl}/api/users${pagination.getNextString}`,
            },
          },
        },
      });

      // res.status(200).json(users);
    } else {
      console.log("Empty result");
      throw createHttpError(404, "No users found");
    }
  } catch (error) {
    next(error);
  }
}

async function getUser(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
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

// Ensure that the request body contains the required fields through interface
async function createUser(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const userData = req.body as UserInterface;

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
async function updateUser(
  req: any,
  res: any,
  next: NextFunction
): Promise<void> {
  try {
    const userId = req.params.id;

    if (!ObjectId.isValid(userId)) {
      console.log("Invalid document id");
      throw createHttpError(400, "Invalid document id");
    }

    const userData: UserInterface = req.body;
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

async function deleteUser(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
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
