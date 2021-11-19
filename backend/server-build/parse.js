"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var csvParser_1 = require("./utils/csvParser");
var dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
(0, csvParser_1.parseCsv)('tulokset-Kimmo.csv');
