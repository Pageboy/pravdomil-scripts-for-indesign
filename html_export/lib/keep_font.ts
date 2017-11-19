interface PravdomilExportOptionsSettings {
    keepFontFiles?: boolean;
}

function pravdomilExportKeepFontFiles(opt: PravdomilExportOptions) {
    if (!opt.settings.keepFontFiles) {
        const path = opt.file.parent + "/" + opt.file.nameWithoutExt() + "-web-resources/script/FontData.js";
        const file = new File(path);
        if (file.exists) {
            file.remove();
        }
        
        opt.headFilters.push(pravdomilExportKeepFontFilesFilter);
    }
}

// noinspection JSUnusedLocalSymbols
function pravdomilExportKeepFontFilesFilter(opt: PravdomilExportOptions, i: number, str: string) {
    const r = /<script src="[^"]*-web-resources\/script\/FontData.js" type="text\/javascript"><\/script>\s*/;
    return str.replace(r, "");
}
