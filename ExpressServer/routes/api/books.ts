import * as express from "express";
import { readJson } from "../../fs-helper";
import { cache } from "../../cache/cache";

export const booksApi = express.Router();

booksApi.get('/', async function (req, res, next) {
    const authors = await readJson("../../data/authors.json");
    res.send(authors);
});

booksApi.post('/', (req, res, next) => {
    res.status(405).send({ message: "Authors are read only resource" });
})
