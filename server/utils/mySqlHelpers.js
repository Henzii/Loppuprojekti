"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeConnection = void 0;
var promise_1 = __importDefault(require("mysql2/promise"));
var makeConnection = function () {
    return promise_1.default.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: 'main',
        connectTimeout: 5000
    });
};
exports.makeConnection = makeConnection;
