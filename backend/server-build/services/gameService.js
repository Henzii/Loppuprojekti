"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var mySqlHelpers_1 = require("../utils/mySqlHelpers");
var addGame = function (gameData, connection) {
    if (connection === void 0) { connection = undefined; }
    return __awaiter(void 0, void 0, void 0, function () {
        var con, _a, id, gameid, _i, _b, player, qry;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    if (!(connection !== undefined)) return [3 /*break*/, 1];
                    _a = connection;
                    return [3 /*break*/, 3];
                case 1: return [4 /*yield*/, (0, mySqlHelpers_1.makeConnection)()];
                case 2:
                    _a = _c.sent();
                    _c.label = 3;
                case 3:
                    con = _a;
                    return [4 /*yield*/, getCourseId(gameData.course, gameData.layout, con)];
                case 4:
                    id = _c.sent();
                    if (!!id) return [3 /*break*/, 6];
                    return [4 /*yield*/, createCourse({
                            course: gameData.course,
                            layout: gameData.layout,
                            date: gameData.date,
                            par: +gameData.par
                        }, con)];
                case 5:
                    id = (_c.sent());
                    _c.label = 6;
                case 6: return [4 /*yield*/, (createGame(id, gameData.date, con))];
                case 7:
                    gameid = _c.sent();
                    if (!gameid) {
                        if (!connection)
                            con.end();
                        return [2 /*return*/, null];
                    } // Jos peli on jo olemassa, palauta null
                    _i = 0, _b = gameData.players;
                    _c.label = 8;
                case 8:
                    if (!(_i < _b.length)) return [3 /*break*/, 12];
                    player = _b[_i];
                    // Lisätään yhden pelaajan tuloskortti tietokantaan
                    return [4 /*yield*/, (connection === null || connection === void 0 ? void 0 : connection.query("INSERT INTO scorecard (user, game, course, playerName, total, hc) VALUES (\n            null,\n            " + gameid + ",\n            " + id + ",\n            '" + player.name + "',\n            " + player.total + ",\n            null);\n        "))];
                case 9:
                    // Lisätään yhden pelaajan tuloskortti tietokantaan
                    _c.sent();
                    qry = "INSERT INTO score(scorecard, score, indeksi) VALUES\n            " + player.scores.map(function (s, i) { return "(last_insert_id(), " + s + ", " + (i + 1) + ")\n"; }) + "\n        ;";
                    return [4 /*yield*/, (connection === null || connection === void 0 ? void 0 : connection.query(qry))];
                case 10:
                    _c.sent();
                    _c.label = 11;
                case 11:
                    _i++;
                    return [3 /*break*/, 8];
                case 12:
                    if (connection === undefined)
                        con.end();
                    return [2 /*return*/, gameid];
            }
        });
    });
};
var getCourseId = function (courseName, layoutName, con) { return __awaiter(void 0, void 0, void 0, function () {
    var rows, e_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, con.query('SELECT id from course WHERE name = ? AND layout = ?', [courseName, layoutName])];
            case 1:
                rows = (_a.sent())[0];
                if (rows.length === 0)
                    return [2 /*return*/, null];
                return [2 /*return*/, rows[0].id];
            case 2:
                e_1 = _a.sent();
                console.log('Mysql error ' + e_1);
                return [2 /*return*/, null];
            case 3: return [2 /*return*/];
        }
    });
}); };
var createGame = function (courseId, date, con) { return __awaiter(void 0, void 0, void 0, function () {
    var result, e_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, con.query("INSERT INTO game (course, date) VALUES (?)", [[courseId, date]])];
            case 1:
                result = (_a.sent())[0];
                return [2 /*return*/, result.insertId];
            case 2:
                e_2 = _a.sent();
                return [2 /*return*/, null];
            case 3: return [2 /*return*/];
        }
    });
}); };
var createCourse = function (course, con) { return __awaiter(void 0, void 0, void 0, function () {
    var result, e_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, con.query("INSERT INTO course (name, layout, par) VALUES (?)", [[course.course, course.layout, course.par]])];
            case 1:
                result = (_a.sent())[0];
                return [2 /*return*/, result.insertId];
            case 2:
                e_3 = _a.sent();
                console.log(e_3);
                throw e_3;
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.default = { addGame: addGame };
