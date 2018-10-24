import { MongoClient } from 'mongodb';

export const dbContext = async (connectionString: string, dbName: string) => {
    const client = await MongoClient.connect(connectionString, { useNewUrlParser: true });
    const db = await client.db(dbName);
    return db;
}