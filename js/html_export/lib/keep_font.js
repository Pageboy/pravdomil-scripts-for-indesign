"use strict";
function pravdomilExportKeepFontFiles(opt) {
    if (!opt.settings.keepFontFiles) {
        var path = opt.file.parent + "/" + opt.file.nameWithoutExt() + "-web-resources/script/FontData.js";
        var file = new File(path);
        if (file.exists) {
            file.remove();
        }
        opt.headFilters.push(pravdomilExportKeepFontFilesFilter);
    }
}
// noinspection JSUnusedLocalSymbols
function pravdomilExportKeepFontFilesFilter(opt, i, str) {
    var r = /<script src="[^"]*-web-resources\/script\/FontData.js" type="text\/javascript"><\/script>\s*/;
    return str.replace(r, "");
}
