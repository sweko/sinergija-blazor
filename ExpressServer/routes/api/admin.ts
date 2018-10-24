import * as express from 'express';
import * as jwt from 'express-jwt';
import { MongoClient } from "mongodb";

import { readJson } from "../../fs-helper";

export const adminApi = express.Router();

adminApi.use(jwt({ secret: 'secret' }));

adminApi.get('/authors/seed', async function (req, res, next) {
    console.log("starting transferAuthors");
    const url = 'mongodb://127.0.0.1:27017';
    const dbName = 'bookr';
    const client = await MongoClient.connect(url, { useNewUrlParser: true });
    const db = client.db(dbName);
    const authorCollection = db.collection("authors");
    console.log("connected to authors - transferAuthors");

    await authorCollection.deleteMany({});
    console.log("deleted all authors - transferAuthors");

    const authors = await readAuthors();
    console.log("loaded authors, start inserting - transferAuthors");

    const result = await authorCollection.insertMany(authors);
    console.log("inserted authors - transferAuthors");
    console.log(`Inserted ${result.insertedCount} items`);

    client.close();
    res.send({
        success: true,
        count: result.insertedCount
    })
});

const readAuthors = async () => {
    const authors = <any[]>await readJson("../../data/authors.json");
    return authors;
}


