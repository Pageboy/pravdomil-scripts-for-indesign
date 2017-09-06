"use strict";
function pravdomilExportFilterFiles(opt) {
    if (opt.settings.mergePages) {
        var bodies = [];
        var i = -1;
        for (var _i = 0, _a = opt.files; _i < _a.length; _i++) {
            var file_1 = _a[_i];
            i++;
            if (i == 0) {
                continue;
            }
            var content_1 = readFile(file_1);
            file_1.remove();
            var body = pravdomilExportFilterBody(opt, i, content_1, true);
            bodies.push(body.substr(6));
        }
        opt.files.splice(1);
        var file = opt.file;
        var content = readFile(file);
        content = pravdomilExportFilterHead(opt, 0, content);
        content = pravdomilExportFilterBody(opt, 0, content);
        content += bodies.join("");
        saveFile(file, content);
    }
    else {
        var i = -1;
        for (var _b = 0, _c = opt.files; _b < _c.length; _b++) {
            var file = _c[_b];
            i++;
            var content = readFile(file);
            content = pravdomilExportFilterHead(opt, i, content);
            content = pravdomilExportFilterBody(opt, i, content);
            saveFile(file, content);
        }
    }
}
function pravdomilExportFilterBody(opt, i, content, returnFilteredPart) {
    if (returnFilteredPart === void 0) { returnFilteredPart = false; }
    return pravdomilExportFilterDo(opt, i, content, ['<body'], opt.bodyFilters, returnFilteredPart);
}
function pravdomilExportFilterHead(opt, i, content, returnFilteredPart) {
    if (returnFilteredPart === void 0) { returnFilteredPart = false; }
    return pravdomilExportFilterDo(opt, i, content, ['<head>', '</head>'], opt.headFilters, returnFilteredPart);
}
function pravdomilExportFilterDo(opt, i, content, match, filters, returnFilteredPart) {
    if (returnFilteredPart === void 0) { returnFilteredPart = false; }
    var start = content.indexOf(match[0]);
    if (start == -1) {
        return content;
    }
    var end = content.indexOf(match[1]);
    var str;
    if (end == -1) {
        str = content.substr(start);
    }
    else {
        str = content.substr(start + match[0].length, end - start - match[0].length);
    }
    for (var _i = 0, filters_1 = filters; _i < filters_1.length; _i++) {
        var filter = filters_1[_i];
        str = filter(opt, i, str);
    }
    if (returnFilteredPart) {
        return str;
    }
    else if (end == -1) {
        return content.substr(0, start) + str;
    }
    else {
        return content.substr(0, start + match[0].length) + str + content.substr(end);
    }
}
