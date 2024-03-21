"use strict";
exports.__esModule = true;
// https://gist.github.com/penguinboy/762197
exports.flattenObject = function (ob) {
    var toReturn = {};
    for (var i in ob) {
        if (!ob.hasOwnProperty(i))
            continue;
        if (typeof ob[i] === 'object') {
            var flatObject = exports.flattenObject(ob[i]);
            for (var x in flatObject) {
                if (!flatObject.hasOwnProperty(x))
                    continue;
                toReturn[i + "." + x] = flatObject[x];
            }
        }
        else {
            toReturn[i] = ob[i];
        }
    }
    return toReturn;
};
exports.createKeysForPlural = function (keys) {
    var results = keys
        .map(function (key) {
        if (key.endsWith('_one')) {
            return [key, key.substr(0, key.length - 4)];
        }
        if (key.endsWith('_other')) {
            return [key, key.substr(0, key.length - 6)];
        }
        return key;
    })
        .flat();
    return Array.from(new Set(results));
};
//# sourceMappingURL=parse-translations.js.map