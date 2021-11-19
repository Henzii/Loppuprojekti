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
exports.mutations = void 0;
var bcrypt_1 = __importDefault(require("bcrypt"));
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var fs_1 = __importDefault(require("fs"));
var stream_1 = require("stream");
var csvParser_1 = require("../utils/csvParser");
var apollo_server_errors_1 = require("apollo-server-errors");
var userService_1 = __importDefault(require("../services/userService"));
var gameService_1 = __importDefault(require("../services/gameService"));
var setupService_1 = __importDefault(require("../services/setupService"));
var validators_1 = require("../utils/validators");
exports.mutations = {
    Mutation: {
        addUser: function (_root, args) { return __awaiter(void 0, void 0, void 0, function () {
            var hashedPassoword, res, newUser;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(0, validators_1.validString)(args.name) || !(0, validators_1.validString)(args.password))
                            throw new apollo_server_errors_1.UserInputError('Argumentit ei kelpaa...');
                        return [4 /*yield*/, bcrypt_1.default.hash(args.password, 10)];
                    case 1:
                        hashedPassoword = _a.sent();
                        return [4 /*yield*/, userService_1.default.addUser(args.name, args.email, hashedPassoword)];
                    case 2:
                        res = _a.sent();
                        newUser = {
                            id: res.insertId,
                            name: args.name,
                            email: args.email,
                            rooli: 'user',
                            active: false,
                        };
                        return [2 /*return*/, newUser];
                }
            });
        }); },
        login: function (_root, args) { return __awaiter(void 0, void 0, void 0, function () {
            var name, password, user, _a, payload, token;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        name = args.name, password = args.password;
                        if (!(!(0, validators_1.validString)(name) || !(0, validators_1.validString)(password))) return [3 /*break*/, 1];
                        throw new apollo_server_errors_1.UserInputError('Väärä tunnus tai salasana');
                    case 1: return [4 /*yield*/, userService_1.default.getUser(name)];
                    case 2:
                        user = _b.sent();
                        _a = !user;
                        if (_a) return [3 /*break*/, 4];
                        return [4 /*yield*/, bcrypt_1.default.compare(password, user.passwordHash)];
                    case 3:
                        _a = !(_b.sent());
                        _b.label = 4;
                    case 4:
                        if (_a)
                            throw new apollo_server_errors_1.UserInputError('Väärä tunnus tai salasana');
                        else {
                            payload = {
                                id: user.id,
                                name: user.name,
                                rooli: user.rooli,
                            };
                            if (!(0, validators_1.validString)(process.env.TOKEN_KEY))
                                throw new apollo_server_errors_1.ApolloError('Avaimet hukassa');
                            token = jsonwebtoken_1.default.sign(payload, process.env.TOKEN_KEY);
                            return [2 /*return*/, token];
                        }
                        _b.label = 5;
                    case 5: return [2 /*return*/];
                }
            });
        }); },
        addGame: function (_root, args) { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                try {
                    return [2 /*return*/, gameService_1.default.addGame(args.game)];
                }
                catch (e) {
                    throw new Error('Peliä ei voitu lisätä!');
                }
                return [2 /*return*/];
            });
        }); },
        addAlias: function (_root, args, context) { return __awaiter(void 0, void 0, void 0, function () {
            var userId;
            return __generator(this, function (_a) {
                if (args.userId && context.user.rooli !== 'admin')
                    throw new apollo_server_errors_1.AuthenticationError('Access denied');
                if (!args.alias)
                    throw new apollo_server_errors_1.UserInputError('What alias?');
                userId = args.userId || context.user.id;
                try {
                    return [2 /*return*/, userService_1.default.addAlias(userId, args.alias)];
                }
                catch (e) {
                    throw new apollo_server_errors_1.UserInputError('Aliasta ei voitu lisätä :P');
                }
                return [2 /*return*/];
            });
        }); },
        deleteAlias: function (_root, args, context) { return __awaiter(void 0, void 0, void 0, function () {
            var userId, poistetut;
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!((_a = context === null || context === void 0 ? void 0 : context.user) === null || _a === void 0 ? void 0 : _a.id))
                            throw new apollo_server_errors_1.AuthenticationError('Access denied');
                        userId = context.user.id;
                        if (context.user.rooli === 'admin')
                            userId = undefined;
                        return [4 /*yield*/, userService_1.default.deleteAlias(args.aliasId, userId)];
                    case 1:
                        poistetut = _b.sent();
                        if (poistetut > 0)
                            return [2 /*return*/, true];
                        return [2 /*return*/, false];
                }
            });
        }); },
        uploadCsvFile: function (_paret, args, context) { return __awaiter(void 0, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                if (!((_a = context.user) === null || _a === void 0 ? void 0 : _a.id))
                    throw new apollo_server_errors_1.AuthenticationError('Access denied');
                return [2 /*return*/, args.file.then(function (file) {
                        var createReadStream = file.createReadStream, filename = file.filename, mimetype = file.mimetype;
                        var fileStream = createReadStream();
                        fileStream.pipe(fs_1.default.createWriteStream("./upload/" + context.user.name + ".csv"));
                        (0, stream_1.finished)(fileStream, function () {
                            (0, csvParser_1.parseCsv)(context.user.name + ".csv", context.user.name);
                        });
                        return file;
                    })];
            });
        }); },
        setSetup: function (_root, args, context) { return __awaiter(void 0, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (((_a = context.user) === null || _a === void 0 ? void 0 : _a.rooli) !== 'admin')
                            throw new apollo_server_errors_1.AuthenticationError('Access denied');
                        return [4 /*yield*/, setupService_1.default.writeSetup(args)];
                    case 1: return [2 /*return*/, _b.sent()];
                }
            });
        }); },
        updateUser: function (_root, args, context) { return __awaiter(void 0, void 0, void 0, function () {
            var pwHash, _a, res;
            var _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        if (!((_b = context === null || context === void 0 ? void 0 : context.user) === null || _b === void 0 ? void 0 : _b.id))
                            throw new apollo_server_errors_1.AuthenticationError('Access denied');
                        if (!(args.password)) return [3 /*break*/, 2];
                        return [4 /*yield*/, bcrypt_1.default.hash(args.password, 10)];
                    case 1:
                        _a = _c.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        _a = undefined;
                        _c.label = 3;
                    case 3:
                        pwHash = _a;
                        return [4 /*yield*/, userService_1.default.updateUser(pwHash, args.email, context.user.id)];
                    case 4:
                        res = _c.sent();
                        return [2 /*return*/, res];
                }
            });
        }); },
        activateUser: function (_root, args, context) { return __awaiter(void 0, void 0, void 0, function () {
            var res;
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (((_a = context.user) === null || _a === void 0 ? void 0 : _a.rooli) !== 'admin')
                            throw new apollo_server_errors_1.AuthenticationError('Access denied');
                        return [4 /*yield*/, userService_1.default.activateUser(args.userId)];
                    case 1:
                        res = _b.sent();
                        return [2 /*return*/, res];
                }
            });
        }); }
    },
};
