import { Author, Authors } from "../model/author";
import { FragmentOptions, Fragment } from "../model/fragment";
import { readJson } from "../fs-helper";
import { cache } from "../cache/cache";
import { dbContext } from '../mongoConfig'

export interface AuthorRepository {
    // retrieval methods
    getAllAuthors: (fragmentParams?: FragmentOptions) => Promise<Fragment<Author>>;
    getAuthorById: (id: number) => Promise<Author>;
    findAuthorsByName: (nameFragment: string, fragmentParams?: FragmentOptions) => Promise<Fragment<Author>>;

    // data manipulation methods
    addAuthor: (author: Author) => Author;
    deleteAuthor: (id: number) => boolean;
    updateAuthor: (author: Author) => Promise<Author>;
}

const repoGenerator = async () => {

    const db = await dbContext('mongodb://127.0.0.1:27017', 'bookr');

    console.log("Connected to mongo");
    const authors = db.collection<Author>('authors')
    console.log(`There are ${await authors.countDocuments()} authors`);

    return () => {

        const repo: AuthorRepository = {
            getAllAuthors: async ({ first, last } = {}) => {
                console.log("getting all authors");
                const total = await authors.count();
                first = first || 0;
                last = last || total - 1;
                const items = await authors.find({}).skip(first).limit(last - first).toArray();
                return {
                    items,
                    total,
                    first,
                    last
                }
            },
            getAuthorById: async (id) => {
                console.log(`get author by id ${id} ${typeof id}`);
                const result = await authors.findOne({ wweId: id });
                return result;
            },
            findAuthorsByName: async (nameFragment = "", { first, last } = {}) => {
                console.log(`getting authors by name ${nameFragment}`);

                const cursor = await authors.find({ name: { '$regex': nameFragment, '$options': 'i' } });
                const total = await cursor.count()

                first = first || 0;
                last = last || total - 1;

                const items = await cursor.skip(first).limit(last - first).toArray();

                last = Math.min(last, total);

                return {
                    items,
                    total,
                    first,
                    last
                }
            },
            addAuthor: null,
            deleteAuthor: null,
            updateAuthor: async (author) => {
                const result = await authors.findOneAndUpdate({ wweId: author.wweId }, { $set: author });
                return result.value;
            },
        }
        return repo;
    }
}

export const getRepository = repoGenerator();

