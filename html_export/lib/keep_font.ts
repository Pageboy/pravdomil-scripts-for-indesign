interface PravdomilExportOptionsSettings {
  keepFontFiles?: boolean;
}

function pravdomilExportKeepFontFiles(opt: PravdomilExportOptions) {
  if(!opt.settings.keepFontFiles) {
    let fontFile = new File(opt.files[0].parent + '/' + opt.files[0].nameWithoutExt() + '-web-resources/script/FontData.js');
    if(fontFile.exists) {
      fontFile.remove();
    }
  }
}
