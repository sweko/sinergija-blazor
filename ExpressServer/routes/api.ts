const express = require('express');

import { cache } from "../cache/cache";
import { readJson } from "../fs-helper";
import { authorsApi } from "./api/authors";
import { booksApi } from "./api/books";
import { awardsApi } from "./api/awards";
import { adminApi } from "./api/admin";

export const apiRouter = express.Router();


apiRouter.get('/', function (req, res, next) {
    res.send(["add", "subtract", "multiply"]);
});

apiRouter.get('/add/:first/:second', function (req, res, next) {
    const first = Number(req.params.first);
    const second = Number(req.params.second);

    const result = first + second;

    res.send({
        first,
        second,
        result
    });
});

apiRouter.use("/authors", authorsApi);
apiRouter.use("/books", booksApi);
apiRouter.use("/awards", awardsApi);
apiRouter.use("/admin", adminApi);
import * as jwt from 'jsonwebtoken';

apiRouter.post('/login', async function (req, res, next) {
    const { user, pass } = req.body;

    if ((user === "admin") && (pass === "AdminPa$$")) {
        const token = jwt.sign({ id: user}, "secret", {
            expiresIn: 86400
        });
        res.status(200).send({ auth: true, token: token });
    } else {
        res.status(401).send({ auth: false });
    }
});

apiRouter.get('/:default', async function (req, res, next) {
    res.status(404).send({ a: "default route response" });
});



