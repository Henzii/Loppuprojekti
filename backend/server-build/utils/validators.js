"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validInt = exports.validString = void 0;
var validString = function (obj, allowEmptyString) {
    if (allowEmptyString === void 0) { allowEmptyString = false; }
    if ((obj instanceof String || typeof obj === 'string')) {
        if (allowEmptyString !== true && obj === '')
            return false;
        return true;
    }
    return false;
};
exports.validString = validString;
var validInt = function (obj, range) {
    if (Number.isSafeInteger(obj)) {
        if (range !== undefined) {
            if (obj < range.min || obj > range.max)
                return false;
        }
        return true;
    }
    return false;
};
exports.validInt = validInt;
