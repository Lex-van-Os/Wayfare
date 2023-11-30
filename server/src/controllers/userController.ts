import * as userService from "../services/userService.ts";
import { ObjectId } from "mongodb";

async function getUsers(req: any, res: any) {
  try {
    const result = await userService.getAllUsers();

    if (result) {
      res.status(200).json(result);
    } else {
      console.log("Empty result");
      res.status(404).json({ error: "No users found" });
    }
  } catch (error) {
    console.error("Error retrieving all users:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

async function getUser(req: any, res: any) {
  try {
    const userId = req.params.id;
    const user = await userService.getUserById(userId);

    if (user) {
      res.status(200).json(user);
    } else {
      console.log("User not found");
      res.status(404).json({ error: "User not found" });
    }
  } catch (error) {
    console.error("Error retrieving user:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

async function createUser(req: any, res: any) {
  try {
    const userData = req.body;
    const newUser = await userService.createUser(userData);

    res.status(201).json(newUser);
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

/**
 * Updates a user with the provided data.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Promise<void>} - A promise that resolves when the user is updated.
 */
async function updateUser(req: any, res: any) {
  try {
    console.log("Update user");
    const userId = req.params.id;

    if (!ObjectId.isValid(userId)) {
      console.log("Invalid document id");
      return res.status(400).json({ error: "Invalid document id" });
    }

    const userData = req.body;
    const updatedUser = await userService.updateUser(userId, userData);

    if (updatedUser) {
      res.status(200).json(updatedUser);
    } else {
      console.log("User not found");
      res.status(404).json({ error: "User not found" });
    }
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

async function deleteUser(req: any, res: any) {
  try {
    const userId = req.params.id;
    const deletedUser = await userService.deleteUser(userId);

    if (deletedUser) {
      res.status(200).json(deletedUser);
    } else {
      console.log("User not found");
      res.status(404).json({ error: "User not found" });
    }
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

export { getUsers, getUser, createUser, updateUser, deleteUser };
