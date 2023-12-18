import { Collection, Document } from "mongodb";
import { client } from "../server.ts";

export async function getCollection<T extends Document>(
  collectionName: string
): Promise<Collection<T>> {
  const db = client.db();
  return db.collection<T>(collectionName);
}

export async function createFilterModel(queryParameters: any) {
  return Object.keys(queryParameters)
    .reduce(
      (obj, key) => {
        obj[key] = { $regex: queryParameters[key], $options: "i" };
        return obj;
      },
      {} as Record<string, any>
    );
}
