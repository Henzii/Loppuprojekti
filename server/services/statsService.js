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
var getSimpleCourseStats = function (id) { return __awaiter(void 0, void 0, void 0, function () {
    var con, queryString, result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, (0, mySqlHelpers_1.makeConnection)()];
            case 1:
                con = _a.sent();
                queryString = "\n        # Pelaajan kaikkien ratojen viimeisin, keskiarvo, min, max, 10 viim. kierrosta.\n        SELECT \n            course as 'rataId',\n            course.name as 'rata',\n            course.layout,\n            course.par,\n            playerName as 'nimi',\n            count(total) as 'games',\n            min(total) as 'min',\n            max(total) as 'max',\n            avg(total) as 'avg',\n            (\n                SELECT group_concat(tulos) from (\n                    SELECT total as 'tulos' from scorecard s1\n                    inner join game on game = game.id\n                    where playerName = nimi and s1.course = rataId\n                    order by game.date desc\n                    limit 10\n                ) tenLates\n            ) as 'tenLatestRounds'\n        FROM scorecard\n        INNER JOIN course on course = course.id\n        WHERE playerName IN (\n            SELECT alias from alias\n            WHERE user = ?\n        )\n        GROUP BY course, playerName\n    ";
                return [4 /*yield*/, con.query(queryString, [id])];
            case 2:
                result = (_a.sent())[0];
                return [2 /*return*/, result];
        }
    });
}); };
var getCompetitions = function () { return __awaiter(void 0, void 0, void 0, function () {
    var con, queryString, result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, (0, mySqlHelpers_1.makeConnection)()];
            case 1:
                con = _a.sent();
                queryString = "\n    #Hakee kilpailut tietokannasta\n    SELECT game, game.date as 'paivays', course.name, course.layout, course.par, playerName, total, (\n        ### Hakee 10 edellist\u00E4 kierrosta kyseiselt\u00E4 radalta ###\n        select group_concat(tulos) from (\n            select total as 'tulos' from scorecard s1\n            inner join game on game = game.id\n            where playerName IN (SELECT alias from alias where user = (SELECT user from alias where alias = s2.playerName))\n                and s1.course = s2.course\n                and game.date < paivays\n            order by game.date desc\n            limit 10\n        ) tenLates\n    ) as 'tenLatestRounds'\n        ### --------- ###\n    FROM scorecard s2\n    INNER JOIN game ON s2.game = game.id\n    INNER JOIN course on s2.course = course.id\n    WHERE game IN (\t\n        ######## Listaa pelit joissa min 5 aliakset-taulusta l\u00F6ytyv\u00E4\u00E4 pelaajaa\n        SELECT s.game from scorecard s\n        INNER JOIN game on s.game = game.id\n        WHERE playerName IN (\n            SELECT alias from alias\n        ) AND game.date > (SELECT ignoreMatchBefore FROM setup)\n        GROUP BY game\n        HAVING count(*) >= (SELECT minPlayersForMatch FROM setup)\n        ######## --------- ##########\n    ) AND playerName IN (SELECT alias from alias)\n    ";
                return [4 /*yield*/, con.query(queryString)];
            case 2:
                result = (_a.sent())[0];
                return [2 /*return*/, result];
        }
    });
}); };
exports.default = { getSimpleCourseStats: getSimpleCourseStats, getCompetitions: getCompetitions };
