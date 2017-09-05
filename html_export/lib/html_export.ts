interface PravdomilExportOptionsSettings {
  [index: string]: any;
  
  onlyCurrentPage?: boolean;

  mergePages?: boolean;

  keepFontFiles?: boolean;
  versioning?: boolean;

  outputFile?: string;
}

interface PravdomilExportOptions {
  document: Document;
  settings: PravdomilExportOptionsSettings;
  showSettingsDialog: boolean;
}

function pravdomilHTMLExport(options?: PravdomilExportOptions) {
  let opt: PravdomilExportOptions;
  
  if(options) {
    opt = options;
  }
  else {
    if(!app.documents.length) { return }
    opt = {
      document: app.activeDocument,
      settings: {},
      showSettingsDialog: true,
    }
  }
  
  pravdomilExportSettingsDefault(opt.settings);
  
  if(opt.showSettingsDialog && !pravdomilExportSettingsDialog(opt)) {
    return;
  }
  
  let file = new File(opt.settings.outputFile);
  if(opt.settings.versioning) {
    file = new File(file.parent + "/" + versionString() + "/" + file.displayName);
    if(!file.parent.exists) { file.parent.create() }
  }
  
  let exportPref = opt.document.htmlFXLExportPreferences;
  if(opt.settings.onlyCurrentPage) {
    exportPref.epubPageRangeFormat = PageRangeFormat.EXPORT_PAGE_RANGE;
    exportPref.epubPageRange = app.activeWindow.activePage.name
  }
  else {
    exportPref.epubPageRangeFormat = PageRangeFormat.EXPORT_ALL_PAGES
  }
  
  opt.document.exportFile(ExportFormat.HTMLFXL, file, true);
  
  let files = [file];
  for(let i = 1; i < opt.document.pages.length; i++) {
    let f = new File(file.parent + "/" + file.nameWithoutExt() + "-" + i + ".html");
    files.push(f)
  }
  
  optimize_html(opt.document, files, opt);
  
  let currentFile = files[(app.activeWindow.activePage.name - 1) | 0];
  
  openFile(file);
}
