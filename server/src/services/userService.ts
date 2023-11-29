import { client } from "../server.ts";

export async function getUsers() {
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
