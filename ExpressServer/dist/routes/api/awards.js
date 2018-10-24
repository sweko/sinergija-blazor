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
const fs_helper_1 = require("../../fs-helper");
const cache_1 = require("../../cache/cache");
exports.awardsApi = express.Router();
exports.awardsApi.get('/', function (req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const authors = yield fs_helper_1.readJson("../../data/authors.json");
        res.send(authors);
    });
});
exports.awardsApi.post('/', (req, res, next) => {
    res.status(405).send({ message: "Authors are read only resource" });
});
exports.awardsApi.get('/:from/:to', function (req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const from = Number(req.params.from);
        if (isNaN(from)) {
            res.status(400).send({
                message: "the from parameter is not a number",
                value: req.params.from
            });
        }
        const to = Number(req.params.to);
        if (isNaN(to)) {
            res.status(400).send({
                message: "the to parameter is not a number",
                value: req.params.to
            });
        }
        if (from > to) {
            res.status(422).send({
                message: "the from parameter cannot be more than the to parameter",
                value: {
                    from: req.params.from,
                    to: req.params.to
                }
            });
        }
        const term = req.query.search;
        let authors = cache_1.cache.getItem("authors");
        if (!authors) {
            console.log("Loading data from disk");
            authors = yield fs_helper_1.readJson("../../data/authors.json");
            cache_1.cache.setItem("authors", authors);
        }
        if (term) {
            authors = authors.filter(author => author.name.toLowerCase().includes(term));
        }
        res.send(authors.slice(from, to));
    });
});
