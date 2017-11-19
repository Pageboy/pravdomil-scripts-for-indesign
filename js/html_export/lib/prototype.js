"use strict";
File.prototype.nameWithoutExt = function () {
    return this.name.replace(/\.[^.]+$/, "");
};
String.prototype.trim = function () {
    return this.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, "");
};
String.prototype.padStart = function (targetLength, padString) {
    if (padString === void 0) { padString = " "; }
    if (this.length > targetLength) {
        return String(this);
    }
    else {
        targetLength = targetLength - this.length;
        if (targetLength > padString.length) {
            padString += padString.repeat(targetLength / padString.length);
        }
        return padString.slice(0, targetLength) + String(this);
    }
};
String.prototype.padEnd = function padEnd(targetLength, padString) {
    if (padString === void 0) { padString = " "; }
    if (this.length > targetLength) {
        return String(this);
    }
    else {
        targetLength = targetLength - this.length;
        if (targetLength > padString.length) {
            padString += padString.repeat(targetLength / padString.length);
        }
        return String(this) + padString.slice(0, targetLength);
    }
};
String.prototype.repeat = function (count) {
    count = Math.floor(count);
    var str = String(this);
    if (str.length === 0 || count === 0) {
        return "";
    }
    var rpt = "";
    for (var i = 0; i < count; i++) {
        rpt += str;
    }
    return rpt;
};
