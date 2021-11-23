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
Object.defineProperty(exports, "__esModule", { value: true });
var mathAndShit_1 = require("../utils/mathAndShit");
var graphql_upload_1 = require("graphql-upload");
var mutations_1 = require("./mutations");
var queries_1 = require("./queries");
var resolvers = __assign(__assign(__assign({}, mutations_1.mutations), queries_1.queries), { Upload: graphql_upload_1.GraphQLUpload, Competition: {
        hc: function (root) {
            if (!root.tenLatestRounds)
                return 0;
            var kierrokset = root.tenLatestRounds.split(',').map(Number);
            return (0, mathAndShit_1.median)(kierrokset) - root.par;
        },
    }, SimpleCourseStats: {
        tenLatestRounds: function (root) {
            var kierrokset = root.tenLatestRounds.split(',').map(Number);
            root.tenLatestMedian = (0, mathAndShit_1.median)(kierrokset);
            root.hc = root.tenLatestMedian - root.par;
            return kierrokset;
        },
    } });
exports.default = resolvers;
