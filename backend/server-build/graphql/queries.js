"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
exports.queries = void 0;
var userService_1 = __importDefault(require("../services/userService"));
var setupService_1 = __importDefault(require("../services/setupService"));
var statsService_1 = __importDefault(require("../services/statsService"));
var logService_1 = require("../services/logService");
var apollo_server_errors_1 = require("apollo-server-errors");
exports.queries = {
    Query: {
        getSetup: function (_root, _args, context) { return __awaiter(void 0, void 0, void 0, function () {
            var res;
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (((_a = context.user) === null || _a === void 0 ? void 0 : _a.rooli) !== 'admin')
                            throw new apollo_server_errors_1.AuthenticationError('Access denied');
                        return [4 /*yield*/, setupService_1.default.getSetup()];
                    case 1:
                        res = _b.sent();
                        return [2 /*return*/, res];
                }
            });
        }); },
        getUsers: function (_root, args, context) { return __awaiter(void 0, void 0, void 0, function () {
            var res;
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (((_a = context === null || context === void 0 ? void 0 : context.user) === null || _a === void 0 ? void 0 : _a.rooli) !== 'admin')
                            throw new apollo_server_errors_1.AuthenticationError('Access denied');
                        return [4 /*yield*/, userService_1.default.getAllUsers(args.active)];
                    case 1:
                        res = _b.sent();
                        return [2 /*return*/, res];
                }
            });
        }); },
        getUser: function (_root, args) { return __awaiter(void 0, void 0, void 0, function () {
            var res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, userService_1.default.getUser((args.id) ? args.id : args.name)];
                    case 1:
                        res = _a.sent();
                        return [2 /*return*/, res];
                }
            });
        }); },
        getMe: function (_root, args, context) { return __awaiter(void 0, void 0, void 0, function () {
            var res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!context.user)
                            return [2 /*return*/, null];
                        if (!args.fetchFromDatabase) return [3 /*break*/, 2];
                        return [4 /*yield*/, userService_1.default.getUser(context.user.id)];
                    case 1:
                        res = _a.sent();
                        return [2 /*return*/, res];
                    case 2: return [2 /*return*/, context.user];
                }
            });
        }); },
        getLogs: function (_root, args, context) { return __awaiter(void 0, void 0, void 0, function () {
            var prosessi, res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!context.user)
                            throw new apollo_server_errors_1.AuthenticationError('Access denied');
                        if (context.user.rooli !== 'admin') {
                            prosessi = 'CsvParser';
                        }
                        else
                            prosessi = '';
                        return [4 /*yield*/, (0, logService_1.readLogs)(prosessi)];
                    case 1:
                        res = _a.sent();
                        return [2 /*return*/, res];
                }
            });
        }); },
        getCourseStats: function (_root, _args, context) { return __awaiter(void 0, void 0, void 0, function () {
            var res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!context.user)
                            throw new apollo_server_errors_1.AuthenticationError('Access denied');
                        return [4 /*yield*/, statsService_1.default.getSimpleCourseStats(context.user.id)];
                    case 1:
                        res = _a.sent();
                        return [2 /*return*/, res];
                }
            });
        }); },
        getAliases: function (_root, args, context) { return __awaiter(void 0, void 0, void 0, function () {
            var res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!context.user || (args.userId && args.userId !== context.user.id && context.user.rooli !== 'admin')) {
                            throw new apollo_server_errors_1.AuthenticationError('Access denied');
                        }
                        return [4 /*yield*/, userService_1.default.getAliases((args.userId || context.user.id))];
                    case 1:
                        res = _a.sent();
                        return [2 /*return*/, res];
                }
            });
        }); },
        getCompetitions: function (_root, _args, context) { return __awaiter(void 0, void 0, void 0, function () {
            var res;
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, statsService_1.default.getCompetitions()];
                    case 1:
                        res = _b.sent();
                        if (!((_a = context.user) === null || _a === void 0 ? void 0 : _a.id)) {
                            return [2 /*return*/, res.map(function (r, i) {
                                    return __assign(__assign({}, r), { playerName: names[Math.floor(Math.random() * names.length)] });
                                })];
                        }
                        return [2 /*return*/, res];
                }
            });
        }); }
    },
};
var names = [
    'Uolevi',
    'Torsti',
    'Vemmel',
    'Velmeri',
    'Jonne',
    'Pasi-Pekka',
    'Jani-Petteri',
    'Irmeli',
    'Taisto',
    'Leif',
    'Jorma69',
    'Usuknoob',
    'Jallu',
    'Pena',
    'Mica',
    'Jerry',
];
