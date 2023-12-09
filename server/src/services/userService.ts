import { client } from "../server.ts";
import { ObjectId } from "mongodb";
import { hash, compare } from "bcrypt";
import { UserInterface } from "../models/user.ts";
import createPagination from "../util/pagination.ts";

/**
 * Retrieves all users from the database.
 * @param {number} start - The start index of the current page.
 * @param {number} limit - The number of users per page.
 * @returns {Promise<any[]>} - Array of users.
 * @throws {Error} - If there is an error retrieving users.
 */
export async function getAllUsers(
  start: number,
  limit: number,
): Promise<UserInterface[]> {
  try {
    const db = client.db();
    const collection = db.collection<UserInterface>("users");

    // Set remaining two necessary paging values
    const skip = start && limit ? start - 1 : 0;
    // const total = await collection.countDocuments();

    const results = await collection
      .find()
      .skip(skip)
      .limit(limit)
      .toArray();

    // const pagination = createPagination(total, start, limit);

    return results;
  } catch (error) {
    console.error("Error retrieving users:", error);
    throw new Error("Failed to retrieve users");
  }
}

/**
 * Retrieves a user by their ID from the database.
 * @param {string} id - The ID of the user.
 * @returns {Promise<any>} - The user object.
 * @throws {Error} - If there is an error retrieving the user.
 */
export async function getUserById(id: string): Promise<UserInterface | null> {
  try {
    const db = client.db();
    const collection = db.collection<UserInterface>("users");
    console.log(collection);
    const result = await collection.findOne<UserInterface>({
      _id: new ObjectId(id),
    });

    if (!result) {
      throw new Error(`User with id ${id} does not exist`);
    }

    return result;
  } catch (error) {
    console.error(`Error retrieving user with id ${id}:`, error);
    throw error;
  }
}

/**
 * Retrieves the total count of documents in the users collection.
 * @returns {Promise<number>} - The total count of documents.
 * @throws {Error} - If there is an error retrieving the count.
 */
export async function getTotalUserCount(): Promise<number> {
  try {
    const db = client.db();
    const collection = db.collection("users");
    const count = await collection.countDocuments();

    return count;
  } catch (error) {
    console.error("Error retrieving total user count:", error);
    throw new Error("Failed to retrieve total user count");
  }
}

/**
 * Creates a new user in the database.
 * @param {any} user - The user object to be created.
 * @returns {Promise<any>} - The result of the insertion.
 * @throws {Error} - If there is an error creating the user.
 */

export async function createUser(user: UserInterface): Promise<any> {
  try {
    const db = client.db();
    const collection = db.collection<UserInterface>("users");

    // Validate user input
    if (!user.name || !user.email || !user.password) {
      throw new Error("Invalid user data");
    }

    // Check if user with the same email already exists
    const existingUser = await collection.findOne({ email: user.email });
    if (existingUser) {
      throw new Error("User with the same email already exists");
    }

    console.log("Inserting user");
    user.password = await hashPassword(user.password);
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
export async function updateUser(
  id: string,
  updatedUser: UserInterface
): Promise<any> {
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
export async function deleteUser(id: string): Promise<any> {
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

/**
 * Retrieves the hashed password from the database based on the provided hashed password.
 * @param {string} hashedPassword - The hashed password to retrieve.
 * @returns {Promise<any>} - The document containing the hashed password.
 * @throws {Error} - If there is an error retrieving the hashed password.
 */
export async function retrieveHashedPassword(hashedPassword: string) {
  try {
    const db = client.db();
    const collection = db.collection("users");

    const result = await collection.findOne({ password: hashedPassword });

    return result;
  } catch (error) {
    console.error("Error retrieving hashed password:", error);
    throw error;
  }
}

/**
 * Hashes the provided password using bcrypt.
 * @param {string} name - The name associated with the password.
 * @param {string} password - The password to be hashed.
 * @returns {Promise<string>} - The hashed password.
 * @throws {Error} - If there is an error hashing the password.
 */
export async function hashPassword(password: string) {
  try {
    const saltRounds = 10;

    const hashedPassword = await hash(password, saltRounds);

    return hashedPassword;
  } catch (error) {
    console.error("Error hashing password:", error);
    throw error;
  }
}

/**
 * Authenticates a user by comparing the provided password with the hashed password stored in the database.
 * @param {string} name - The name associated with the password.
 * @param {string} password - The password to be authenticated.
 * @returns {Promise<boolean>} - True if the password is a match, false otherwise.
 * @throws {Error} - If there is an error authenticating the user.
 */
export async function authenticateUser(name: string, password: string) {
  try {
    const retrievedPasswordDocument = await retrieveHashedPassword(password);

    if (retrievedPasswordDocument) {
      const retrievedPassword = retrievedPasswordDocument.password;
      const isPasswordMatch = await compare(password, retrievedPassword);

      if (isPasswordMatch) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  } catch (error) {
    console.error("Error authenticating user:", error);
    throw error;
  }
}
