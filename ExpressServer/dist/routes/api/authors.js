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
const cheerio = require("cheerio");
const request_helper_1 = require("../../request-helper");
const author_repo_1 = require("../../repos/author-repo");
exports.authorsApi = express.Router();
exports.authorsApi.get('/', function (req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const repo = (yield author_repo_1.getRepository)();
        const authors = yield repo.getAllAuthors();
        res.send(authors);
    });
});
exports.authorsApi.get('/id/:id', function (req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const id = Number(req.params.id);
        const repo = (yield author_repo_1.getRepository)();
        const author = yield repo.getAuthorById(id);
        if (!author) {
            res.sendStatus(404);
            return;
        }
        res.send(author);
    });
});
exports.authorsApi.post('/', (req, res, next) => __awaiter(this, void 0, void 0, function* () {
    const repo = (yield author_repo_1.getRepository)();
    repo.updateAuthor({
        wweId: 1,
        name: "name",
        bookCount: 10
    });
    //res.status(405).send({ message: "Authors are read only resource" });
}));
exports.authorsApi.get('/:id/books/load', function (req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        //to-do
        const id = Number(req.params.id);
        const repo = (yield author_repo_1.getRepository)();
        const author = yield repo.getAuthorById(id);
        const page = yield request_helper_1.request(`https://www.worldswithoutend.com/author.asp?ID=${id}`);
        const $ = cheerio.load(page.body);
        const years = $("table:has(.awardslisting):not(:has(table))")
            .each(table => $(table).find("td").first())
            .toArray()
            .map(td => Number($(td).text().match(/\((\d*)\)/)[1]));
        const books = $(".awardslisting p.title").toArray().map((div, index) => ({
            id: Number($(div).find("a").attr("href").substr(13)),
            title: $(div).text(),
            year: years[index]
        }));
        author.books = books;
        author.bookCount = books.length;
        yield repo.updateAuthor(author);
        // to-do: add books to book
        res.send(books);
    });
});
exports.authorsApi.get('/:from/:to', function (req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const first = Number(req.params.from);
        if (isNaN(first)) {
            res.status(400).send({
                message: "the from parameter is not a number",
                value: req.params.from
            });
        }
        const last = Number(req.params.to);
        if (isNaN(last)) {
            res.status(400).send({
                message: "the to parameter is not a number",
                value: req.params.to
            });
        }
        if (first > last) {
            res.status(422).send({
                message: "the from parameter cannot be more than the to parameter",
                value: {
                    from: req.params.from,
                    to: req.params.to
                }
            });
        }
        const term = req.query.search;
        const repo = (yield author_repo_1.getRepository)();
        const authors = yield repo.findAuthorsByName(term, { first, last });
        if (authors.total === 0) {
            res.status(404);
        }
        res.send(authors);
    });
});
exports.authorsApi.patch('/:id', function (req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const repo = (yield author_repo_1.getRepository)();
        const id = Number(req.params.id);
        const operation = req.body.bookCount;
        let author = yield repo.getAuthorById(id);
        if (!author) {
            res.sendStatus(404);
            return;
        }
        if (operation === "add") {
            author.bookCount += 1;
        }
        else if (operation === "remove") {
            author.bookCount -= 1;
        }
        author = yield repo.updateAuthor(author);
        res.send({
            author: author,
            success: true
        });
    });
});
exports.authorsApi.get('/:id/books', function (req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        res.send([]);
    });
});
