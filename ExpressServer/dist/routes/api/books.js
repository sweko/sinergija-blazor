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
exports.booksApi = express.Router();
exports.booksApi.get('/', function (req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const authors = yield fs_helper_1.readJson("../../data/authors.json");
        res.send(authors);
    });
});
exports.booksApi.post('/', (req, res, next) => {
    res.status(405).send({ message: "Authors are read only resource" });
});
