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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var apollo_server_errors_1 = require("apollo-server-errors");
var mySqlHelpers_1 = require("../utils/mySqlHelpers");
var logService_1 = __importDefault(require("./logService"));
var getAllUsers = function (active) {
    if (active === void 0) { active = undefined; }
    return __awaiter(void 0, void 0, void 0, function () {
        var con, query, rows, e_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, mySqlHelpers_1.makeConnection)()];
                case 1:
                    con = _a.sent();
                    _a.label = 2;
                case 2:
                    _a.trys.push([2, 4, 5, 6]);
                    query = "\n            SELECT * FROM user\n            " + ((active !== undefined) ? 'WHERE active = ?' : '') + "\n        ";
                    return [4 /*yield*/, con.query(query, [active])];
                case 3:
                    rows = (_a.sent())[0];
                    return [2 /*return*/, rows];
                case 4:
                    e_1 = _a.sent();
                    throw new Error(e_1);
                case 5:
                    con.end();
                    return [7 /*endfinally*/];
                case 6: return [2 /*return*/];
            }
        });
    });
};
var getUser = function (param) { return __awaiter(void 0, void 0, void 0, function () {
    var con, rows, e_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, (0, mySqlHelpers_1.makeConnection)()];
            case 1:
                con = _a.sent();
                _a.label = 2;
            case 2:
                _a.trys.push([2, 4, 5, 6]);
                return [4 /*yield*/, con.query("SELECT * from user WHERE " + ((typeof param === 'string') ? 'name' : 'id') + " = ?", param)];
            case 3:
                rows = (_a.sent())[0];
                if (rows.length === 0)
                    return [2 /*return*/, null];
                return [2 /*return*/, rows[0]];
            case 4:
                e_2 = _a.sent();
                throw new apollo_server_errors_1.UserInputError("SQL virhe'");
            case 5:
                con.end();
                return [7 /*endfinally*/];
            case 6: return [2 /*return*/];
        }
    });
}); };
var addUser = function (name, email, password) { return __awaiter(void 0, void 0, void 0, function () {
    var con, rows, e_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, (0, mySqlHelpers_1.makeConnection)()];
            case 1:
                con = _a.sent();
                _a.label = 2;
            case 2:
                _a.trys.push([2, 4, 5, 6]);
                return [4 /*yield*/, con.query("INSERT INTO user (name, email, passwordHash, rooli) VALUES (?)", [[name, email, password, 'user']])];
            case 3:
                rows = (_a.sent())[0];
                (0, logService_1.default)('UserService', 'success', "Tunnus " + name + " luotiin onnistuneesti");
                return [2 /*return*/, rows];
            case 4:
                e_3 = _a.sent();
                (0, logService_1.default)('UserService', 'error', "Tunnuksen " + name + " luonti ep\u00E4onnistui. Error: " + e_3);
                throw new apollo_server_errors_1.UserInputError("Tunnus on jo k\u00E4yt\u00F6ss\u00E4");
            case 5:
                con.end();
                return [7 /*endfinally*/];
            case 6: return [2 /*return*/];
        }
    });
}); };
var getAliases = function (userId) { return __awaiter(void 0, void 0, void 0, function () {
    var con, rows, e_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, (0, mySqlHelpers_1.makeConnection)()];
            case 1:
                con = _a.sent();
                _a.label = 2;
            case 2:
                _a.trys.push([2, 4, 5, 6]);
                return [4 /*yield*/, con.query('SELECT id, alias from alias WHERE user = ?', userId)];
            case 3:
                rows = (_a.sent())[0];
                return [2 /*return*/, rows];
            case 4:
                e_4 = _a.sent();
                (0, logService_1.default)('UserService', 'error', "Ei voitu hakea aliakseia k\u00E4ytt\u00E4j\u00E4lle " + userId);
                return [3 /*break*/, 6];
            case 5:
                con.end();
                return [7 /*endfinally*/];
            case 6: return [2 /*return*/];
        }
    });
}); };
var addAlias = function (userId, alias) { return __awaiter(void 0, void 0, void 0, function () {
    var con, result, e_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, (0, mySqlHelpers_1.makeConnection)()];
            case 1:
                con = _a.sent();
                _a.label = 2;
            case 2:
                _a.trys.push([2, 4, 5, 6]);
                return [4 /*yield*/, con.query('INSERT INTO alias (user, alias) VALUES (?,?)', [userId, alias])];
            case 3:
                result = (_a.sent())[0];
                return [2 /*return*/, result.insertId];
            case 4:
                e_5 = _a.sent();
                (0, logService_1.default)('UserService', 'error', "Aliasta ei voitu lis\u00E4t\u00E4 (" + userId + ", " + alias + "). Error: " + e_5);
                if (e_5.code === 'ER_DUP_ENTRY')
                    throw new apollo_server_errors_1.UserInputError('Alias on jo olemassa');
                throw new Error('Mystinen virhe');
            case 5:
                con.end();
                return [7 /*endfinally*/];
            case 6: return [2 /*return*/];
        }
    });
}); };
var deleteAlias = function (aliasId, userId) { return __awaiter(void 0, void 0, void 0, function () {
    var con, res, e_6;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, (0, mySqlHelpers_1.makeConnection)()];
            case 1:
                con = _a.sent();
                _a.label = 2;
            case 2:
                _a.trys.push([2, 4, 5, 6]);
                return [4 /*yield*/, con.query("DELETE from alias WHERE id = ? " + ((userId) ? 'AND user = ?' : ''), [aliasId, userId])];
            case 3:
                res = (_a.sent())[0];
                return [2 /*return*/, res.affectedRows];
            case 4:
                e_6 = _a.sent();
                (0, logService_1.default)('UserService', 'error', "Aliasta ei voitu poistaa (id: " + aliasId + "), " + e_6);
                throw Error('Aliasta ei voitu poistaa :P');
            case 5:
                con.end();
                return [7 /*endfinally*/];
            case 6: return [2 /*return*/];
        }
    });
}); };
var updateUser = function (passwordHash, email, userId) { return __awaiter(void 0, void 0, void 0, function () {
    var con, vars, query, res;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!passwordHash && !email)
                    throw new Error('Antaisit edes yhden parametrin');
                return [4 /*yield*/, (0, mySqlHelpers_1.makeConnection)()];
            case 1:
                con = _a.sent();
                vars = [];
                if (email)
                    vars.push(email);
                if (passwordHash)
                    vars.push(passwordHash);
                query = "\n        UPDATE user SET\n        " + ((email) ? 'email = ?' : '') + ((vars.length > 1) ? ',' : '') + "\n        " + ((passwordHash) ? 'passwordHash = ?' : '') + "\n        WHERE id = ?\n    ";
                return [4 /*yield*/, con.query(query, __spreadArray(__spreadArray([], vars, true), [userId], false))];
            case 2:
                res = (_a.sent())[0];
                con.end();
                return [2 /*return*/, res.changedRows];
        }
    });
}); };
var activateUser = function (userId) { return __awaiter(void 0, void 0, void 0, function () {
    var con, query, res;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, (0, mySqlHelpers_1.makeConnection)()];
            case 1:
                con = _a.sent();
                query = "\n        UPDATE user SET\n        active = 1\n        WHERE id = ?\n    ";
                return [4 /*yield*/, con.query(query, userId)];
            case 2:
                res = (_a.sent())[0];
                return [2 /*return*/, res.affectedRows];
        }
    });
}); };
exports.default = { getAllUsers: getAllUsers, addUser: addUser, getUser: getUser, getAliases: getAliases, addAlias: addAlias, deleteAlias: deleteAlias, updateUser: updateUser, activateUser: activateUser };
