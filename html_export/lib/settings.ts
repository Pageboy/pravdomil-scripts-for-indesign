function pravdomilExportSettingsDefaults(settings: PravdomilExportOptionsSettings) {
    if (settings.keepFontFiles == undefined) {
        settings.keepFontFiles = true;
    }
}

function pravdomilExportSettingsGet(doc: Document, settings: { [index: string]: any }) {
    const label = doc.extractLabel("pravdomil_html_export");
    const data = myJSONParse(label);
    if (typeof data == "object") {
        for (const key in data) {
            if (data.hasOwnProperty(key)) {
                settings[key] = data[key];
            }
        }
    }
}

function pravdomilExportSettingsSave(document: Document, settings: PravdomilExportOptionsSettings) {
    const label = myJSONStringify(settings);
    document.insertLabel("pravdomil_html_export", label);
}

function pravdomilExportSettingsDialog(opt: PravdomilExportOptions): true | undefined {
    pravdomilExportSettingsGet(opt.document, opt.settings);
    
    const dialog = new Window("dialog", "Pravdomil HTML Export");
    dialog.alignChildren = "fill";
    
    const pagesPanel = dialog.add("panel") as Panel;
    pagesPanel.margins = 20;
    pagesPanel.orientation = "row";
    pagesPanel.text = "Pages";
    const allPages = pagesPanel.add("radiobutton", undefined, "All Pages") as RadioButton;
    allPages.value = !Boolean(opt.settings.onlyCurrentPage);
    const onlyCurrentPage = pagesPanel.add("radiobutton", undefined, "Current Page") as RadioButton;
    onlyCurrentPage.value = Boolean(opt.settings.onlyCurrentPage);
    
    const outputPanel = dialog.add("panel") as Panel;
    outputPanel.margins = 20;
    outputPanel.orientation = "row";
    outputPanel.text = "Output";
    const splitPages = outputPanel.add("radiobutton", undefined, "Split Pages") as RadioButton;
    splitPages.value = !Boolean(opt.settings.mergePages);
    const mergePages = outputPanel.add("radiobutton", undefined, "Merge Pages") as RadioButton;
    mergePages.value = Boolean(opt.settings.mergePages);
    
    const optionsPanel = dialog.add("panel") as Panel;
    optionsPanel.margins = 20;
    optionsPanel.text = "Options";
    optionsPanel.alignChildren = "left";
    const versioning = optionsPanel.add("checkbox", undefined, "Versioning") as RadioButton; // bug
    versioning.value = Boolean(opt.settings.versioning);
    const keepFontFiles = optionsPanel.add("checkbox", undefined, "Keep Font Files") as RadioButton; // bug
    keepFontFiles.value = Boolean(opt.settings.keepFontFiles);
    const rembasedDebug = optionsPanel.add("checkbox", undefined, "Rembased Debug") as RadioButton; // bug
    rembasedDebug.value = Boolean(opt.settings.rembasedDebug);
    
    const group = dialog.add("group") as Group;
    group.alignment = "right";
    group.add("button", undefined, "Cancel");
    group.add("button", undefined, "OK");
    
    if (dialog.show() == 1) {
        opt.settings.onlyCurrentPage = onlyCurrentPage.value;
        opt.settings.mergePages = mergePages.value;
        opt.settings.versioning = versioning.value;
        opt.settings.keepFontFiles = keepFontFiles.value;
        opt.settings.rembasedDebug = rembasedDebug.value;
        
        if (!pravdomilExportSettingsFileDialog(opt)) {
            return;
        }
        
        pravdomilExportSettingsSave(opt.document, opt.settings);
        
        return true;
    }
}

function pravdomilExportSettingsFileDialog(opt: PravdomilExportOptions): true | undefined {
    let path: File;
    
    if (opt.settings.outputFile) {
        const file = new File(opt.settings.outputFile);
        
        if (file.parent.exists) {
            path = file.saveDlg();
        } else {
            opt.settings.outputFile = "";
            return pravdomilExportSettingsFileDialog(opt);
        }
        
    } else if (opt.document.saved) {
        path = new File(opt.document.fullName.fullName.replace(/\.indd$/, ".html")).saveDlg();
        
    } else {
        path = File.saveDialog();
    }
    
    if (!path) {
        return;
    }
    
    let p = String(path);
    if (p.substr(-5) !== ".html") { p += ".html"; }
    opt.settings.outputFile = p;
    opt.file = new File(p);
    
    return true;
}
