"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = require('express');
const authors_1 = require("./api/authors");
const books_1 = require("./api/books");
const awards_1 = require("./api/awards");
const admin_1 = require("./api/admin");
exports.apiRouter = express.Router();
exports.apiRouter.get('/', function (req, res, next) {
    res.send(["add", "subtract", "multiply"]);
});
exports.apiRouter.get('/add/:first/:second', function (req, res, next) {
    const first = Number(req.params.first);
    const second = Number(req.params.second);
    const result = first + second;
    res.send({
        first,
        second,
        result
    });
});
exports.apiRouter.use("/authors", authors_1.authorsApi);
exports.apiRouter.use("/books", books_1.booksApi);
exports.apiRouter.use("/awards", awards_1.awardsApi);
exports.apiRouter.use("/admin", admin_1.adminApi);
const jwt = require("jsonwebtoken");
exports.apiRouter.post('/login', function (req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const { user, pass } = req.body;
        if ((user === "admin") && (pass === "AdminPa$$")) {
            const token = jwt.sign({ id: user }, "secret", {
                expiresIn: 86400
            });
            res.status(200).send({ auth: true, token: token });
        }
        else {
            res.status(401).send({ auth: false });
        }
    });
});
exports.apiRouter.get('/:default', function (req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        res.status(404).send({ a: "default route response" });
    });
});
