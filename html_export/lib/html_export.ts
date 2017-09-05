interface PravdomilExportOptionsSettings {
  onlyCurrentPage?: boolean;
  mergePages?: boolean;
  outputFile?: string;
}

interface PravdomilExportOptions {
  document: Document;
  settings: PravdomilExportOptionsSettings;
  showSettingsDialog: boolean;
  openAfterExport: boolean;
  activePage: number;
  name: string;
  file: File;
  files: File[];
  headFilters: PravdomilExportFilter[];
  bodyFilters: PravdomilExportFilter[];
}

type PravdomilExportFilter = ((opt: PravdomilExportOptions, i: number, str: string) => string)

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
      name: document.name.replace(/\.indd/, ""),
      file: new File(),
      files: [],
      headFilters: [],
      bodyFilters: [],
    }
  }
  
  pravdomilExportSettingsDefaults(opt.settings);
  
  if(opt.showSettingsDialog && !pravdomilExportSettingsDialog(opt)) { return; }
  
  if(!pravdomilExportVersioning(opt)) { return; }
  
  if(!pravdomilExport(opt)) { return; }

  pravdomilExportKeepFontFiles(opt);
  
  pravdomilExportBaseFilters(opt);
  
  pravdomilExportOptimize(opt);
  
  if(opt.openAfterExport) {
    let file = opt.files[Math.max(0, opt.activePage - 1)];
    openFile(file);
  }
}
