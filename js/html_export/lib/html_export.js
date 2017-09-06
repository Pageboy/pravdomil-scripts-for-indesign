"use strict";
function pravdomilHTMLExport(options) {
    var opt;
    if (options) {
        opt = options;
    }
    else {
        if (!app.documents.length) {
            return;
        }
        var document = app.activeDocument;
        opt = {
            document: document,
            settings: {},
            showSettingsDialog: true,
            openAfterExport: true,
            activePage: getActivePage(),
            name: document.name.replace(/\.indd/, ""),
            file: new File(),
            files: [],
            headFilters: [],
            bodyFilters: []
        };
    }
    pravdomilExportSettingsDefaults(opt.settings);
    if (opt.showSettingsDialog && !pravdomilExportSettingsDialog(opt)) {
        return;
    }
    pravdomilExportVersioning(opt);
    if (!pravdomilExport(opt)) {
        return;
    }
    pravdomilExportKeepFontFiles(opt);
    pravdomilExportRembasedDebug(opt);
    pravdomilExportBaseFilters(opt);
    pravdomilExportFilterFiles(opt);
    if (opt.openAfterExport) {
        var index = opt.activePage != undefined ? opt.activePage : 0;
        index = Math.min(index, opt.files.length - 1);
        var file = opt.files[index];
        if (!file) {
            alert("Export failed\nOutput file not found in:\n" + file);
        }
        else {
            openFile(file);
        }
    }
}
