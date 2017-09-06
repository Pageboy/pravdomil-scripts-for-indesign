"use strict";
function pravdomilExport(opt) {
    var exportPref = opt.document.htmlFXLExportPreferences;
    if (opt.settings.onlyCurrentPage) {
        if (opt.activePage) {
            exportPref.epubPageRangeFormat = PageRangeFormat.EXPORT_PAGE_RANGE;
            exportPref.epubPageRange = String(opt.activePage + 1);
        }
        else {
            alert("Cannot export current page");
            return;
        }
    }
    else {
        exportPref.epubPageRangeFormat = PageRangeFormat.EXPORT_ALL_PAGES;
    }
    opt.document.exportFile(ExportFormat.HTMLFXL, opt.file, true);
    opt.files = [opt.file];
    if (!opt.settings.onlyCurrentPage) {
        for (var i = 1; i < opt.document.pages.length; i++) {
            var f = new File(opt.file.parent + "/" + opt.file.nameWithoutExt() + "-" + i + ".html");
            opt.files.push(f);
        }
    }
    return true;
}
