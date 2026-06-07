import { MongoClient, ServerApiVersion } from "mongodb"

if (!process.env.MONGODB_URI) {
    throw new Error("MongoDB URI not found")
}

const client = new MongoClient(process.env.MONGODB_URI, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    },
});

let cachedClient = null;

async function getDB(dbName) {
    if (cachedClient) {
        return cachedClient.db(dbName);
    }
    try {
        await client.connect();
        cachedClient = client;
        console.log(">>>>Connected to DB<<<<");

        // TTL index to auto-delete documents older than 30 days
        const db = client.db("plant-monitor-v2-DB");
        await db.collection("telemetry").createIndex(
            { "timestamp": 1 },
            { expireAfterSeconds: 2592000 }
        );

        return cachedClient.db(dbName);
    } catch (err) {
        console.log(err);
    }
}

export async function getCollection(collectionName) {
    const db = await getDB("plant-monitor-v2-DB");
    if (db) return db.collection(collectionName);

    return null;
}