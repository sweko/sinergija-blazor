import * as jwt from 'jsonwebtoken';
import * as express from 'express';

import { authorsApi } from "./api/authors";

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

apiRouter.get('/:default', async function (req, res, next) {
    res.status(404).send({ a: "default route response" });
});



