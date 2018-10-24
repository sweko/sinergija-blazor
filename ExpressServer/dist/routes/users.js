"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
var router = express.Router();
exports.usersRouter = router;
/* GET users listing. */
router.get('/', function (req, res, next) {
    res.send('respond with a resource');
});
