function pravdomilExportSettingsDefault(settings: PravdomilExportOptionsSettings) {
  if(settings.keepFontFiles == undefined) {
    settings.keepFontFiles = true;
  }
}

function pravdomilExportSettingsGet(doc: Document, settings: PravdomilExportOptionsSettings) {
  let label = doc.extractLabel("pravdomil_html_export");
  let data = myJSONParse(label);
  if(typeof data == "object") {
    for(let key in data) {
      settings[key] = data[key];
    }
  }
}

function pravdomilExportSettingsSave(document: Document, settings: PravdomilExportOptionsSettings) {
  let label = myJSONStringify(settings);
  document.insertLabel("pravdomil_html_export", label)
}

function pravdomilExportSettingsDialog(opt: PravdomilExportOptions): true | undefined {  
  pravdomilExportSettingsGet(opt.document, opt.settings);
  
  let dialog = new Window("dialog", "Pravdomil HTML Export");
  dialog.alignChildren = "fill";
  
  let pagesPanel = dialog.add("panel") as Panel;
  pagesPanel.margins = 20;
  pagesPanel.orientation = "row";
  pagesPanel.text = "Pages";
  let allPages = pagesPanel.add("radiobutton", undefined, "All Pages") as RadioButton;
  allPages.value = !Boolean(opt.settings.onlyCurrentPage);
  let onlyCurrentPage = pagesPanel.add("radiobutton", undefined, "Current Page") as RadioButton;
  onlyCurrentPage.value = Boolean(opt.settings.onlyCurrentPage);
  
  let outputPanel = dialog.add("panel") as Panel;
  outputPanel.margins = 20;
  outputPanel.orientation = "row";
  outputPanel.text = "Output";
  let splitPages = outputPanel.add("radiobutton", undefined, "Split Pages") as RadioButton;
  splitPages.value = !Boolean(opt.settings.mergePages);
  let mergePages = outputPanel.add("radiobutton", undefined, "Merge Pages") as RadioButton;
  mergePages.value = Boolean(opt.settings.mergePages);
  
  let optionsPanel = dialog.add("panel") as Panel;
  optionsPanel.margins = 20;
  optionsPanel.text = "Options";
  optionsPanel.alignChildren = "left";
  let versioning = optionsPanel.add("checkbox", undefined, "Versioning") as RadioButton; // bug
  versioning.value = Boolean(opt.settings.versioning);
  let keepFontFiles = optionsPanel.add("checkbox", undefined, "Keep Font Files") as RadioButton; // bug
  keepFontFiles.value = Boolean(opt.settings.keepFontFiles);
  
  let group = dialog.add("group") as Group;
  group.alignment = "right";
  group.add("button", undefined, "Cancel");
  group.add("button", undefined, "OK");
  
  if(dialog.show() == 1) {
    opt.settings.onlyCurrentPage = onlyCurrentPage.value;
    opt.settings.mergePages = mergePages.value;
    opt.settings.versioning = versioning.value;
    opt.settings.keepFontFiles = keepFontFiles.value;
    
    let path;
    let outputFile = new File(opt.settings.outputFile);
    if(opt.settings.outputFile && outputFile.parent.exists) {
      path = outputFile.saveDlg()
    }
    else if(opt.document.saved) {
      path = new File(opt.document.fullName.fullName.replace(/\.indd$/, ".html")).saveDlg()
    }
    else {
      path = File.saveDialog()
    }
    if(!path) {
      return
    }
    else {
      let p = String(path);
      if(p.substr(-5) !== ".html") { p += ".html" }
      opt.settings.outputFile = p
    }
    
    pravdomilExportSettingsSave(opt.document, opt.settings);
    return true
  }
}
