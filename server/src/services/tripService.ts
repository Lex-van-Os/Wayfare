import { TripInterface } from "../models/trip";
import { getCollection } from "../util/helpers.ts";
import { ObjectId } from "mongodb";

const COLLECTION_NAME = "trips";

/**
 * Retrieves all trips from the database based on the specified filters.
 * @param page The page number of the results.
 * @param limit The maximum number of results per page.
 * @param filters The filters to apply to the query.
 * @returns A promise that resolves to an array of TripInterface objects.
 * @throws An error if the retrieval fails.
 */
export async function getAllTrips(
  page: number,
  limit: number,
  filters: any
): Promise<TripInterface[]> {
  try {
    const collection = await getCollection<TripInterface>(COLLECTION_NAME);

    const results = await collection
      .find(filters)
      .skip((page - 1) * limit)
      .limit(limit)
      .toArray();

    return results;
  } catch (error) {
    console.error("Error retrieving trips:", error);
    throw new Error("Failed to retrieve trips");
  }
}

/**
 * Retrieves a trip from the database based on the specified ID.
 * @param id The ID of the trip to retrieve.
 * @returns A promise that resolves to a TripInterface object or null if not found.
 * @throws An error if the retrieval fails.
 */
export async function getTripById(id: string): Promise<TripInterface | null> {
  try {
    const collection = await getCollection<TripInterface>(COLLECTION_NAME);

    const result = await collection.findOne<TripInterface>({
      _id: new ObjectId(id),
    });

    if (!result) {
      throw new Error(`Trip with id ${id} does not exist`);
    }

    return result;
  } catch (error) {
    console.error(`Error retrieving trip with id ${id}:`, error);
    throw error;
  }
}

/**
 * Creates a new trip in the database.
 * @param trip The trip object to create.
 * @returns A promise that resolves to the ID of the created trip.
 * @throws An error if the creation fails.
 */
export async function createTrip(trip: TripInterface): Promise<any> {
  try {
    const collection = await getCollection<TripInterface>(COLLECTION_NAME);

    const result = await collection.insertOne(trip);

    if (result.acknowledged) {
      return result.insertedId;
    } else {
      throw new Error("Failed to create trip");
    }
  } catch (error) {
    console.error("Error creating trip:", error);
    throw error;
  }
}

/**
 * Updates an existing trip in the database.
 * @param id The ID of the trip to update.
 * @param trip The updated trip object.
 * @returns A promise that resolves to the result of the update operation.
 * @throws An error if the update fails.
 */
export async function updateTrip(
  id: string,
  trip: TripInterface
): Promise<any> {
  try {
    const collection = await getCollection(COLLECTION_NAME);

    const result = await collection.updateOne(
      { _id: new ObjectId(id) },
      { $set: trip }
    );

    if (result.matchedCount === 0) {
      throw new Error(`Trip with id ${id} does not exist`);
    } else if (result.acknowledged) {
      return result;
    } else {
      throw new Error("Failed to delete trip");
    }
  } catch (error) {
    console.log("Error updating trip:", error);
    throw error;
  }
}

/**
 * Deletes a trip from the database based on the specified ID.
 * @param id The ID of the trip to delete.
 * @returns A promise that resolves to the result of the delete operation.
 * @throws An error if the deletion fails.
 */
export async function deleteTrip(id: string): Promise<any> {
  try {
    const collection = await getCollection<TripInterface>(COLLECTION_NAME);

    const result = await collection.deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 0) {
      throw new Error(`Trip with id ${id} does not exist`);
    } else if (result.acknowledged) {
      return result;
    } else {
      throw new Error("Failed to delete trip");
    }
  } catch (error) {
    console.log("Error deleting trip:", error);
    throw error;
  }
}
