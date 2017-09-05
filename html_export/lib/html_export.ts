interface PravdomilExportOptionsSettings {
  onlyCurrentPage?: boolean;
  mergePages?: boolean;
  keepFontFiles?: boolean;
  outputFile?: string;
}

interface PravdomilExportOptions {
  document: Document;
  settings: PravdomilExportOptionsSettings;
  showSettingsDialog: boolean;
  file: File;
}

function pravdomilHTMLExport(options?: PravdomilExportOptions) {
  let opt: PravdomilExportOptions;
  
  if(options) {
    opt = options;
  }
  else {
    if(!app.documents.length) { return }
    let document = app.activeDocument;
    opt = {
      document,
      settings: {},
      showSettingsDialog: true,
      file: new File(),
    }
  }
  
  pravdomilExportSettingsDefaults(opt.settings);
  if(opt.showSettingsDialog && !pravdomilExportSettingsDialog(opt)) { return; }
  if(!pravdomilExportVersioning(opt)) { return; }
  if(!pravdomilExport(opt)) { return; }
  
  
  let files = [file];
  for(let i = 1; i < opt.document.pages.length; i++) {
    let f = new File(file.parent + "/" + file.nameWithoutExt() + "-" + i + ".html");
    files.push(f)
  }
  
  optimize_html(opt.document, files, opt);
  
  let currentFile = files[(app.activeWindow.activePage.name - 1) | 0];
  
  openFile(file);
}
