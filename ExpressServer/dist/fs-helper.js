"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
exports.readFolder = (name) => {
    return new Promise((resolve, reject) => {
        fs.readdir(name, (err, files) => {
            if (err) {
                reject(err);
            }
            else {
                resolve(files);
            }
        });
    });
};
exports.readImage = (imageName) => {
    return new Promise((resolve, reject) => {
        fs.readFile(imageName, (err, data) => {
            if (err) {
                reject(err);
            }
            else {
                resolve(data);
            }
        });
    });
};
exports.readHtml = (fileName) => {
    return new Promise((resolve, reject) => {
        fs.readFile(fileName, { encoding: "utf-8" }, (err, data) => {
            if (err) {
                reject(err);
            }
            else {
                resolve(data);
            }
        });
    });
};
exports.readJson = (fileName) => {
    return new Promise((resolve, reject) => {
        fs.readFile(fileName, { encoding: "utf-8" }, (err, data) => {
            if (err) {
                reject(err);
            }
            else {
                resolve(JSON.parse(data));
            }
        });
    });
};
