//@include "./lib/prototype.js"
//@include "./lib/support.js"

//@include "./lib/options.js"
//@include "./lib/optimize.js"

app.doScript(pravdomilExport, ScriptLanguage.JAVASCRIPT, [], UndoModes.ENTIRE_SCRIPT, "HTML Export");

function pravdomilExport() {
  if(!app.documents.length) { return }
  
  let doc = app.activeDocument;
  
  let opt = options_dialog(doc);
  if(!opt) { return }
  
  let file = new File(opt.outputFile);
  if(opt.versioning) {
    file = new File(file.parent + "/" + versionString() + "/" + file.displayName);
    if(!file.parent.exists) { file.parent.create() }
  }
  
  let exportPref = doc.htmlFXLExportPreferences;
  if(opt.onlyCurrentPage) {
    exportPref.epubPageRangeFormat = PageRangeFormat.EXPORT_PAGE_RANGE;
    exportPref.epubPageRange = app.activeWindow.activePage.name
  }
  else {
    exportPref.epubPageRangeFormat = PageRangeFormat.EXPORT_ALL_PAGES
  }
  
  doc.exportFile(ExportFormat.HTMLFXL, file, true);
  
  let files = [file];
  for(let i = 1; i < doc.pages.length; i++) {
    let f = new File(file.parent + "/" + file.nameWithoutExt() + "-" + i + ".html");
    files.push(f)
  }

  optimize_html(doc, files, opt);
  
  let currentFile = files[(app.activeWindow.activePage.name - 1) | 0];
  if(opt.onlyCurrentPage || opt.mergePages) { currentFile = file[0] }
  
  openFile(file);
}
