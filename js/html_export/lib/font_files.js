"use strict";
function pravdomilExportKeepFontFiles(opt) {
    if (!opt.settings.keepFontFiles) {
        var fontFile = new File(opt.files[0].parent + '/' + opt.files[0].nameWithoutExt() + '-web-resources/script/FontData.js');
        if (fontFile.exists) {
            fontFile.remove();
        }
    }
}
