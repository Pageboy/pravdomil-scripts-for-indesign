"use strict";
function pravdomilExportSettingsDefaults(settings) {
    if (settings.keepFontFiles === undefined) {
        settings.keepFontFiles = true;
    }
}
function pravdomilExportSettingsGet(doc, settings) {
    var label = doc.extractLabel("pravdomil_html_export");
    var data = myJSONParse(label);
    if (typeof data === "object") {
        for (var key in data) {
            if (data.hasOwnProperty(key)) {
                settings[key] = data[key];
            }
        }
    }
}
function pravdomilExportSettingsSave(document, settings) {
    var label = myJSONStringify(settings);
    document.insertLabel("pravdomil_html_export", label);
}
function pravdomilExportSettingsDialog(opt) {
    pravdomilExportSettingsGet(opt.document, opt.settings);
    var dialog = new Window("dialog", "Pravdomil HTML Export");
    dialog.alignChildren = "fill";
    var pagesPanel = dialog.add("panel");
    pagesPanel.margins = 20;
    pagesPanel.orientation = "row";
    pagesPanel.text = "Pages";
    var allPages = pagesPanel.add("radiobutton", undefined, "All Pages");
    allPages.value = !Boolean(opt.settings.onlyCurrentPage);
    var onlyCurrentPage = pagesPanel.add("radiobutton", undefined, "Current Page");
    onlyCurrentPage.value = Boolean(opt.settings.onlyCurrentPage);
    var outputPanel = dialog.add("panel");
    outputPanel.margins = 20;
    outputPanel.orientation = "row";
    outputPanel.text = "Output";
    var splitPages = outputPanel.add("radiobutton", undefined, "Split Pages");
    splitPages.value = !Boolean(opt.settings.mergePages);
    var mergePages = outputPanel.add("radiobutton", undefined, "Merge Pages");
    mergePages.value = Boolean(opt.settings.mergePages);
    var optionsPanel = dialog.add("panel");
    optionsPanel.margins = 20;
    optionsPanel.text = "Options";
    optionsPanel.alignChildren = "left";
    var versioning = optionsPanel.add("checkbox", undefined, "Versioning"); // bug
    versioning.value = Boolean(opt.settings.versioning);
    var keepFontFiles = optionsPanel.add("checkbox", undefined, "Keep Font Files"); // bug
    keepFontFiles.value = Boolean(opt.settings.keepFontFiles);
    var rembasedDebug = optionsPanel.add("checkbox", undefined, "Rembased Debug"); // bug
    rembasedDebug.value = Boolean(opt.settings.rembasedDebug);
    var group = dialog.add("group");
    group.alignment = "right";
    group.add("button", undefined, "Cancel");
    group.add("button", undefined, "OK");
    if (dialog.show() === 1) {
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
function pravdomilExportSettingsFileDialog(opt) {
    var path;
    if (opt.settings.outputFile) {
        var file = new File(opt.settings.outputFile);
        if (file.parent.exists) {
            path = file.saveDlg();
        }
        else {
            opt.settings.outputFile = "";
            return pravdomilExportSettingsFileDialog(opt);
        }
    }
    else if (opt.document.saved) {
        path = new File(opt.document.fullName.fullName.replace(/\.indd$/, ".html")).saveDlg();
    }
    else {
        path = File.saveDialog();
    }
    if (!path) {
        return;
    }
    var p = String(path);
    if (p.substr(-5) !== ".html") {
        p += ".html";
    }
    opt.settings.outputFile = p;
    opt.file = new File(p);
    return true;
}
