"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var apollo_server_express_1 = require("apollo-server-express");
var dotenv_1 = __importDefault(require("dotenv"));
var cors_1 = __importDefault(require("cors"));
var path_1 = __importDefault(require("path"));
var express_1 = __importDefault(require("express"));
var typedefs_1 = __importDefault(require("./graphql/typedefs"));
var resolvers_1 = __importDefault(require("./graphql/resolvers"));
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var graphql_upload_1 = require("graphql-upload");
var app = (0, express_1.default)();
dotenv_1.default.config();
var corsOptions = {
    credentials: true,
    origin: 'http://localhost:3000'
};
app.use((0, cors_1.default)(corsOptions));
app.use((0, graphql_upload_1.graphqlUploadExpress)());
var server = new apollo_server_express_1.ApolloServer({
    typeDefs: typedefs_1.default,
    resolvers: resolvers_1.default,
    context: function (_a) {
        var req = _a.req;
        if (req.headers.cookie) {
            var _b = req.headers.cookie.split('='), avain = _b[0], token = _b[1];
            if (avain === "suklaaKeksi") {
                if (jsonwebtoken_1.default.verify(token, process.env.TOKEN_KEY)) {
                    var user = jsonwebtoken_1.default.decode(token);
                    return { user: user };
                }
            }
        }
    },
});
server.start().then(function () {
    app.use(express_1.default.static(path_1.default.join(__dirname, '../../frontend/build')));
    app.get('*', function (req, res) {
        if (!req.path.startsWith('/graphql'))
            res.sendFile(path_1.default.resolve(__dirname, '../../frontend/build/index.html'));
    });
    server.applyMiddleware({ app: app, cors: false });
    app.listen({ port: process.env.PORT || 8080 }, function () {
        console.log('Server running... maybe');
    });
}).catch(function (error) {
    console.log('Yhteyttä ei voida muodostaa!', error);
});
