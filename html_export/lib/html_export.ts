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
  activePage: number;
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
      activePage: getActivePage(),
      file: new File(),
      files: [],
    }
  }
  
  pravdomilExportSettingsDefaults(opt.settings);
  
  if(opt.showSettingsDialog && !pravdomilExportSettingsDialog(opt)) { return; }
  if(!pravdomilExportVersioning(opt)) { return; }
  if(!pravdomilExport(opt)) { return; }
  
  optimize_html(opt.document, opt.files, opt);
  
  if(opt.openAfterExport) {
    let file = opt.files[Math.max(0, opt.activePage - 1)];
    openFile(file);
  }
}
