import { MongoClient, Db } from 'mongodb';

const uri = process.env.MONGODB_URI || '';
const dbName = process.env.MONGODB_DB_NAME || 'portfolio';

let cachedClient: MongoClient | null = null;
let cachedDb: Db | null = null;

export async function connectToDatabase(): Promise<{ client: MongoClient; db: Db } | null> {
  if (!uri) return null;
  if (cachedClient && cachedDb) return { client: cachedClient, db: cachedDb };
  try {
    const client = new MongoClient(uri);
    await client.connect();
    const db = client.db(dbName);
    cachedClient = client;
    cachedDb = db;
    return { client, db };
  } catch {
    return null;
  }
}

export function getDb(): Db | null {
  return cachedDb;
}
