//@include "./lib/string.js"
//@include "./lib/myJSON.js"
//@include "./lib/dialog.js"
//@include "./lib/support.js"
//@include "./lib/optimize.js"

app.doScript(epub_export, ScriptLanguage.JAVASCRIPT, [], UndoModes.ENTIRE_SCRIPT, "HTML Export");

function epub_export() {
  if(!app.documents.length) { return }
  
  let doc = app.activeDocument;
  
  let opt = options_dialog(doc);
  if(!opt) { return }
  
  let file = new File(opt.outputFile);
  if(opt.versioning) {
    file = new File(file.parent + '/' + versionString() + '/' + file.displayName);
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
    let f = new File(file.parent + '/' + file.nameWithoutExt() + '-' + i + '.html');
    files.push(f)
  }
  
  optimalize_html(doc, files, opt);
  
  let currentFile = files[(app.activeWindow.activePage.name - 1) | 0];
  if(opt.onlyCurrentPage || opt.mergePages) { currentFile = file[0] }
  
  open_file(file, currentFile)
}
