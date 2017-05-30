#include "lib/string.js"
#include "lib/myJSON.js"
#include "lib/dialog.js"
#include "lib/support.js"
#include "lib/optimalize.js"

app.doScript(epub_export, ScriptLanguage.JAVASCRIPT, [], UndoModes.ENTIRE_SCRIPT, "HTML Export")

function epub_export() {
  if(!app.documents.length) { return }
  
  var doc = app.activeDocument
  
  var opt = options_dialog(doc)
  if(!opt) { return }
  
  var file = new File(opt.outputFile)
  if(opt.versioning) {
    file = new File(file.parent + '/' + versionString() + '/' + file.name)
    if(!file.parent.exists) { file.parent.create() }
  }
  
  var exportPref = doc.htmlFXLExportPreferences
  if(opt.onlyCurrentPage) {
    exportPref.epubPageRangeFormat = PageRangeFormat.EXPORT_PAGE_RANGE
    exportPref.epubPageRange = app.activeWindow.activePage.name
  }
  else {
    exportPref.epubPageRangeFormat = PageRangeFormat.EXPORT_ALL_PAGES
  }
  
  doc.exportFile(ExportFormat.HTMLFXL, file, true)
  
  optimalize_html(doc, file, opt)
  
  open_page(file, opt.currentPage || opt.mergePages ? 1 : app.activeWindow.activePage.name)
}
