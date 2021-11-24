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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseCsv = void 0;
var promises_1 = __importDefault(require("fs/promises"));
var gameService_1 = __importDefault(require("../services/gameService"));
var mySqlHelpers_1 = require("./mySqlHelpers");
var logService_1 = __importDefault(require("../services/logService"));
var parseCsv = function (fileName, uploaderName) {
    if (uploaderName === void 0) { uploaderName = 'unknown'; }
    return __awaiter(void 0, void 0, void 0, function () {
        var rawFile, _a, rivit, gameData, addedGames, totalGames, dbConnection, _i, rivit_1, rivi, _b, player, course, layout, date, total, plusminus, scores, iidee;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    console.log("Aloitetaan tiedoston ".concat(fileName, " parsiminen..."));
                    return [4 /*yield*/, promises_1.default.readFile("./upload/".concat(fileName), 'utf8')];
                case 1:
                    rawFile = _c.sent();
                    _a = rawFile.split('\n'), rivit = _a.slice(1);
                    (0, logService_1.default)('CsvParser', 'info', "Aloitetaan parsia k\u00E4ytt\u00E4j\u00E4lt\u00E4 ".concat(uploaderName, " saatua csv-tiedostoa. Sisl\u00E4t\u00F6: ").concat(rivit.length, " rivi\u00E4."));
                    addedGames = 0;
                    totalGames = 0;
                    return [4 /*yield*/, (0, mySqlHelpers_1.makeConnection)()];
                case 2:
                    dbConnection = _c.sent();
                    dbConnection.query('BEGIN');
                    _i = 0, rivit_1 = rivit;
                    _c.label = 3;
                case 3:
                    if (!(_i < rivit_1.length)) return [3 /*break*/, 8];
                    rivi = rivit_1[_i];
                    _b = rivi.split(','), player = _b[0], course = _b[1], layout = _b[2], date = _b[3], total = _b[4], plusminus = _b[5], scores = _b.slice(6);
                    if (!(player === 'Par' || player === '')) return [3 /*break*/, 6];
                    if (!gameData) return [3 /*break*/, 5];
                    return [4 /*yield*/, gameService_1.default.addGame(gameData, dbConnection)];
                case 4:
                    iidee = _c.sent();
                    if (!iidee) {
                        console.log("Peli\u00E4 ".concat(gameData.course, " @ ").concat(gameData.date, " ei lis\u00E4tty!"));
                    }
                    else {
                        console.log("Lis\u00E4tty ".concat(gameData.course, ", id: ").concat(iidee));
                        addedGames++;
                    }
                    totalGames++;
                    _c.label = 5;
                case 5:
                    gameData = {
                        course: course,
                        layout: layout,
                        date: date,
                        par: +total,
                        players: []
                    };
                    return [3 /*break*/, 7];
                case 6:
                    if (gameData) {
                        gameData.players.push({
                            name: player,
                            total: +total,
                            scores: scores.map(function (s) { return parseInt(s); }).filter(function (s) { return !isNaN(s); }),
                        });
                    }
                    _c.label = 7;
                case 7:
                    _i++;
                    return [3 /*break*/, 3];
                case 8: return [4 /*yield*/, dbConnection.query('COMMIT')];
                case 9:
                    _c.sent();
                    dbConnection.end();
                    (0, logService_1.default)('CsvParser', 'success', "K\u00E4ytt\u00E4j\u00E4n ".concat(uploaderName, " .csv tiedostosta l\u00F6ytyi ").concat(totalGames, " kierrosta joista ").concat(addedGames, " lis\u00E4ttiin tietokantaan"));
                    console.log('Pelejä lisätty:', addedGames, '/', totalGames);
                    return [2 /*return*/];
            }
        });
    });
};
exports.parseCsv = parseCsv;
