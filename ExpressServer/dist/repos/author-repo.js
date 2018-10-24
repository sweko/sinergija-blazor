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
const mongoConfig_1 = require("../mongoConfig");
const repoGenerator = () => __awaiter(this, void 0, void 0, function* () {
    const db = yield mongoConfig_1.dbContext('mongodb://127.0.0.1:27017', 'bookr');
    console.log("Connected to mongo");
    const authors = db.collection('authors');
    console.log(`There are ${yield authors.countDocuments()} authors`);
    return () => {
        const repo = {
            getAllAuthors: ({ first, last } = {}) => __awaiter(this, void 0, void 0, function* () {
                console.log("getting all authors");
                const total = yield authors.count();
                first = first || 0;
                last = last || total - 1;
                const items = yield authors.find({}).skip(first).limit(last - first).toArray();
                return {
                    items,
                    total,
                    first,
                    last
                };
            }),
            getAuthorById: (id) => __awaiter(this, void 0, void 0, function* () {
                console.log(`get author by id ${id} ${typeof id}`);
                const result = yield authors.findOne({ wweId: id });
                return result;
            }),
            findAuthorsByName: (nameFragment = "", { first, last } = {}) => __awaiter(this, void 0, void 0, function* () {
                console.log(`getting authors by name ${nameFragment}`);
                const cursor = yield authors.find({ name: { '$regex': nameFragment, '$options': 'i' } });
                const total = yield cursor.count();
                first = first || 0;
                last = last || total - 1;
                const items = yield cursor.skip(first).limit(last - first).toArray();
                last = Math.min(last, total);
                return {
                    items,
                    total,
                    first,
                    last
                };
            }),
            addAuthor: null,
            deleteAuthor: null,
            updateAuthor: (author) => __awaiter(this, void 0, void 0, function* () {
                const result = yield authors.findOneAndUpdate({ wweId: author.wweId }, { $set: author });
                return result.value;
            }),
        };
        return repo;
    };
});
exports.getRepository = repoGenerator();
