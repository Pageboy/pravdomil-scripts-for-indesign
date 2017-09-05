interface PravdomilExportOptionsSettings {
  keepFontFiles?: boolean;
}

function pravdomilExportKeepFontFiles(opt: PravdomilExportOptions) {
  if(!opt.settings.keepFontFiles) {
    let path = opt.file.parent + "/" + opt.file.nameWithoutExt() + "-web-resources/script/FontData.js";
    let file = new File(path);
    if(file.exists) {
      file.remove();
    }
    
    opt.headFilters.push(pravdomilExportKeepFontFilesFilter);
  }
}

// noinspection JSUnusedLocalSymbols
function pravdomilExportKeepFontFilesFilter(opt: PravdomilExportOptions, i: number, head: string) {
  let r = /<script src="[^"]*-web-resources\/script\/FontData.js" type="text\/javascript"><\/script>\s*/;
  return head.replace(r, "");
}
