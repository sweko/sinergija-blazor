"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const request = require("request");
const requestWrapper = (uri, options) => {
    return new Promise((resolve, reject) => {
        request(uri, options, (err, response) => {
            if (err) {
                reject(err);
            }
            else {
                resolve(response);
            }
        });
    });
};
exports.request = requestWrapper;
