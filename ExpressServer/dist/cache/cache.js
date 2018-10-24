"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const storage = {};
exports.cache = {
    getItem: (name) => {
        if (storage[name]) {
            return storage[name];
        }
    },
    setItem: (name, item) => {
        storage[name] = item;
    }
};
