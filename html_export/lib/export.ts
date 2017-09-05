function pravdomilExport(opt: PravdomilExportOptions) {
  let exportPref = opt.document.htmlFXLExportPreferences;
  
  if(opt.settings.onlyCurrentPage) {
    if(app.activeWindow instanceof LayoutWindow) {
      exportPref.epubPageRangeFormat = PageRangeFormat.EXPORT_PAGE_RANGE;
      exportPref.epubPageRange = app.activeWindow.activePage.name
    }
    else {
      alert("Cannot export current page");
      return;
    }
  }
  else {
    exportPref.epubPageRangeFormat = PageRangeFormat.EXPORT_ALL_PAGES
  }
  
  opt.document.exportFile(ExportFormat.HTMLFXL, opt.file, true);
  
  return true;
}
