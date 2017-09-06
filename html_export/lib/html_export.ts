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
  activePage: number | undefined;
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
  
  pravdomilExportVersioning(opt);
  
  if(!pravdomilExport(opt)) { return; }

  pravdomilExportKeepFontFiles(opt);
  
  pravdomilExportBaseFilters(opt);
  
  pravdomilExportFilterFiles(opt);
  
  if(opt.openAfterExport) {
    let index = opt.activePage != undefined ? opt.activePage : 0;
    index = Math.min(index, opt.files.length - 1);
    let file = opt.files[index];
    if(!file || file.exists) {
      alert("Export failed\nOutput file not found in:\n" + file);
    }
    else {
      openFile(file);
    }
  }
}
