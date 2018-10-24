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
const express = require("express");
const jwt = require("express-jwt");
const mongodb_1 = require("mongodb");
const fs_helper_1 = require("../../fs-helper");
exports.adminApi = express.Router();
exports.adminApi.use(jwt({ secret: 'secret' }));
exports.adminApi.get('/authors/seed', function (req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log("starting transferAuthors");
        const url = 'mongodb://127.0.0.1:27017';
        const dbName = 'bookr';
        const client = yield mongodb_1.MongoClient.connect(url, { useNewUrlParser: true });
        const db = client.db(dbName);
        const authorCollection = db.collection("authors");
        console.log("connected to authors - transferAuthors");
        yield authorCollection.deleteMany({});
        console.log("deleted all authors - transferAuthors");
        const authors = yield readAuthors();
        console.log("loaded authors, start inserting - transferAuthors");
        const result = yield authorCollection.insertMany(authors);
        console.log("inserted authors - transferAuthors");
        console.log(`Inserted ${result.insertedCount} items`);
        client.close();
        res.send({
            success: true,
            count: result.insertedCount
        });
    });
});
const readAuthors = () => __awaiter(this, void 0, void 0, function* () {
    const authors = yield fs_helper_1.readJson("../../data/authors.json");
    return authors;
});
