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
  openAfterExport: boolean;
  file: File;
  files: File[];
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
      openAfterExport: true,
      file: new File(),
      files: [],
    }
  }
  
  pravdomilExportSettingsDefaults(opt.settings);
  
  if(opt.showSettingsDialog && !pravdomilExportSettingsDialog(opt)) { return; }
  if(!pravdomilExportVersioning(opt)) { return; }
  if(!pravdomilExport(opt)) { return; }
  
  optimize_html(opt.document, files, opt);
  
  if(opt.openAfterExport) {
    let file = opt.files[(app.activeWindow.activePage.name - 1) | 0];
    openFile(file);
  }
}
