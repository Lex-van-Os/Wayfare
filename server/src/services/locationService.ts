import { LocationInterface } from "../models/location.ts";
import { getCollection } from "../util/helpers.ts";
import { ObjectId } from "mongodb";

const COLLECTION_NAME = "locations";

export async function getAllLocations(
  page: number,
  limit: number,
  filters: any
): Promise<LocationInterface[]> {
  try {
    const collection = await getCollection<LocationInterface>(COLLECTION_NAME);

    const results = await collection
      .find(filters)
      .skip((page - 1) * limit)
      .limit(limit)
      .toArray();

    return results;
  } catch (error) {
    console.error("Error retrieving locations:", error);
    throw new Error("Failed to retrieve locations");
  }
}

export async function getLocationById(
  id: string
): Promise<LocationInterface | null> {
  try {
    const collection = await getCollection<LocationInterface>(COLLECTION_NAME);

    const result = await collection.findOne<LocationInterface>({
      _id: new ObjectId(id),
    });

    if (!result) {
      throw new Error(`Location with id ${id} does not exist`);
    }

    return result;
  } catch (error) {
    console.error(`Error retrieving location with id ${id}:`, error);
    throw error;
  }
}

export async function createLocation(
  location: LocationInterface
): Promise<any> {
  try {
    const collection = await getCollection<LocationInterface>(COLLECTION_NAME);

    const result = await collection.insertOne(location);

    if (result.acknowledged) {
      return result.insertedId;
    } else {
      throw new Error("Failed to create location");
    }
  } catch (error) {
    console.error("Error creating location:", error);
    throw error;
  }
}

export async function updateLocation(
  id: string,
  location: LocationInterface
): Promise<any> {
  try {
    const collection = await getCollection(COLLECTION_NAME);

    const result = await collection.updateOne(
      { _id: new ObjectId(id) },
      { $set: location }
    );

    if (result.matchedCount === 0) {
      throw new Error(`Location with id ${id} does not exist`);
    } else if (result.acknowledged) {
      return result;
    } else {
      throw new Error("Failed to delete location");
    }
  } catch (error) {
    console.log("Error updating location:", error);
    throw error;
  }
}

export async function deleteLocation(id: string): Promise<any> {
  try {
    const collection = await getCollection<LocationInterface>(COLLECTION_NAME);

    const result = await collection.deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 0) {
      throw new Error(`Location with id ${id} does not exist`);
    } else if (result.acknowledged) {
      return result;
    } else {
      throw new Error("Failed to delete location");
    }
  } catch (error) {
    console.log("Error deleting location:", error);
    throw error;
  }
}
