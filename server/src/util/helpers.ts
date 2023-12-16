import { Collection, Document } from "mongodb";
import { client } from "../server.ts";

export async function getCollection<T extends Document>(
  collectionName: string
): Promise<Collection<T>> {
  const db = client.db();
  return db.collection<T>(collectionName);
}
