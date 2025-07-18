import { MongoClient, MongoClientOptions } from 'mongodb';

if (!process.env.MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable');
}

// Extract database name from environment variable or use 'myscheme' as default
const dbName = process.env.MONGODB_DB_NAME || 'myscheme';
const uri = process.env.MONGODB_URI;
const options: MongoClientOptions = {
  // Add any additional MongoDB options here if needed
};

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

if (process.env.NODE_ENV === 'development') {
  // In development mode, use a global variable to preserve the connection across module reloads
  const globalWithMongo = global as typeof globalThis & {
    _mongoClientPromise?: Promise<MongoClient>;
  };

  if (!globalWithMongo._mongoClientPromise) {
    client = new MongoClient(uri, options);
    globalWithMongo._mongoClientPromise = client.connect();
  }
  clientPromise = globalWithMongo._mongoClientPromise!;
} else {
  // In production mode, avoid using a global variable
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

export async function connectToDatabase() {
  const client = await clientPromise;
  // Use the specified database name
  const db = client.db(dbName);
  return { client, db };
}

// Export the client promise for direct use if needed
export { clientPromise };
