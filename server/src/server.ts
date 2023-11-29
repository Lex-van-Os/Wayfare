import app from "./app.ts";
import { MongoClient, ServerApiVersion } from "mongodb";
import env from "./util/envValidator.ts";

const port = env.PORT;
const dbUri = env.MONGO_CONNECTION_STRING;

export const client = new MongoClient(dbUri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    await client.connect();

    const db = client.db();
    const collectionExists = await db
      .listCollections({ name: "users" })
      .hasNext();

    if (!collectionExists) {
      await db.createCollection("users");

      const usersCollection = db.collection("users");
      const user = {
        name: "John Doe",
        age: 25,
        email: "johndoe@example.com",
      };

      await usersCollection.insertOne(user);
    }

    app.locals.db = client.db();

    await client.db().command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );

    app.listen(port, () => {
      console.log(`Server is running at http://localhost:${port}`);
    });
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

run().catch(console.dir);
