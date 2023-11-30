import { client } from "../server.ts";
import { ObjectId } from "mongodb";

/**
 * Retrieves all users from the database.
 * @returns {Promise<any[]>} - Array of users.
 * @throws {Error} - If there is an error retrieving users.
 */
export async function getAllUsers() {
  try {
    const db = client.db();
    const collection = db.collection("users");
    const results = await collection.find().toArray();

    return results;
  } catch (error) {
    console.error("Error retrieving users:", error);
    throw error;
  }
}

/**
 * Retrieves a user by their ID from the database.
 * @param {string} id - The ID of the user.
 * @returns {Promise<any>} - The user object.
 * @throws {Error} - If there is an error retrieving the user.
 */
export async function getUserById(id: string) {
  try {
    const db = client.db();
    const collection = db.collection("users");
    const result = await collection.findOne({ _id: new ObjectId(id) });

    return result;
  } catch (error) {
    console.error(`Error retrieving user with id ${id}:`, error);
    throw error;
  }
}

/**
 * Creates a new user in the database.
 * @param {any} user - The user object to be created.
 * @returns {Promise<any>} - The result of the insertion.
 * @throws {Error} - If there is an error creating the user.
 */
export async function createUser(user: any) {
  try {
    const db = client.db();
    const collection = db.collection("users");
    const result = await collection.insertOne(user);

    return result;
  } catch (error) {
    console.error("Error creating user:", error);
    throw error;
  }
}

/**
 * Updates an existing user in the database.
 * @param {string} id - The ID of the user to be updated.
 * @param {any} updatedUser - The updated user object.
 * @returns {Promise<any>} - The result of the update operation.
 * @throws {Error} - If there is an error updating the user.
 */
export async function updateUser(id: string, updatedUser: any) {
  try {
    const db = client.db();
    const collection = db.collection("users");
    const result = await collection.updateOne(
      { _id: new ObjectId(id) },
      { $set: updatedUser }
    );

    if (result.matchedCount === 0) {
      throw new Error(`User with id ${id} does not exist`);
    }

    return result;
  } catch (error) {
    console.error(`Error updating user with id ${id}:`, error);
    throw error;
  }
}

/**
 * Deletes a user from the database.
 * @param {string} id - The ID of the user to be deleted.
 * @returns {Promise<any>} - The result of the deletion.
 * @throws {Error} - If there is an error deleting the user.
 */
export async function deleteUser(id: string) {
  try {
    const db = client.db();
    const collection = db.collection("users");
    const result = await collection.deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 0) {
      throw new Error(`User with id ${id} does not exist`);
    }

    return result;
  } catch (error) {
    console.error(`Error deleting user with id ${id}:`, error);
    throw error;
  }
}
