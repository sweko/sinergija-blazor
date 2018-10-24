import * as express from "express";
import * as cheerio from 'cheerio';

import { request } from "../../request-helper";
import { getRepository } from "../../repos/author-repo";

export const authorsApi = express.Router();

authorsApi.get('/', async function (req, res, next) {
    const repo = (await getRepository)();
    const authors = await repo.getAllAuthors();
    res.send(authors);
});

authorsApi.get('/id/:id', async function (req, res, next) {
    const id = Number(req.params.id);
    const repo = (await getRepository)();
    const author = await repo.getAuthorById(id);

    if (!author) {
        res.sendStatus(404);
        return;
    }

    res.send(author);
});

authorsApi.get('/:id/books/load', async function(req, res, next){

    const id = Number(req.params.id);
    const repo = (await getRepository)();
    const author = await repo.getAuthorById(id);

    const page = await request(`https://www.worldswithoutend.com/author.asp?ID=${id}`);
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

    await repo.updateAuthor(author);

    // to-do: add books to book
    
    res.send(books);
});

authorsApi.get('/:from/:to', async function (req, res, next) {

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

    const repo = (await getRepository)();

    const authors = await repo.findAuthorsByName(term, { first, last });

    if (authors.total === 0) {
        res.status(404);
    }

    res.send(authors);
});

authorsApi.patch('/:id', async function(req, res, next) {
    const repo = (await getRepository)();

    const id = Number(req.params.id);
    const operation = req.body.bookCount;

    let author = await repo.getAuthorById(id);

    if (!author) {
        res.sendStatus(404);
        return;
    }

    if (operation === "add") {
        author.bookCount +=1;
    } else if (operation === "remove") {
        author.bookCount -=1;
    }

    author = await repo.updateAuthor(author);

    res.send({
        author: author,
        success: true
    });
});
