#include "lib/string.js"
#include "lib/myJSON.js"
#include "lib/dialog.js"
#include "lib/support.js"

main()

function main() {
  if(!app.documents.length) { return }
  
  epub_export(app.activeDocument)
}

function epub_export(doc) {
  var opt = options_dialog(doc)
  if(!opt) { return }
  
  return
  var folder = findExportFolder(doc.filePath)
  
  var basename = doc.fullName.displayName
  var basenameWithoutExt = basename.substring(0, basename.lastIndexOf('.'))
  
  var parts = basenameWithoutExt.split('-')
  var title = parts[0].trim()
  var filename = parts.length === 1 ? 'index' : parts.slice(1).join('-').trim()
  
  if(doc.extractLabel('export_versioning') | 0) {
    folder = new Folder(folder + '/' + versionString())
  }
  
  if(folder.exists === false) { folder.create() }
  
  var file = new File(folder + '/' + filename + '.html')
  doc.exportFile(ExportFormat.HTMLFXL, file, (showDialog = false))
  
  conformFile(file, title, filename)
  
  var i = 0
  while(true) {
    i++
    var fileWithNumber = new File(folder + '/' + filename + '-' + i + '.html')
    if(fileWithNumber.exists === false) { break }
    conformFile(fileWithNumber, title, filename + '-' + i)
  }
  
  var currentPage = app.activeWindow.activePage.name - 1
  var file = new File(folder + '/' + filename + (currentPage ? '-' + currentPage : '') + '.html')
  
  var openLocation = 'tell application "System Events" to open location "file://' + file.relativeURI + '"'
  app.doScript(openLocation, ScriptLanguage.applescriptLanguage)
}

function conformFile(file, title, filename) {
  file.open('e')
  var content = file.read()
  content = content.replace('<title>' + filename + '</title>', '<title>' + title + '</title> <meta name="viewport" content="width=device-width" /> <script>window.top.isPreviewFile = function() { return {} }</script> <script>window.top.shouldNavigate = function() { return true }</script><script>window.top.onFrameDOMLoaded = function() { return true }</script> <script> function press(innerText) { var butons = document.querySelectorAll(\'._idGenButton\'); for(var i = 0; i < butons.length; i++) { var button = butons[i]; var match = button.textContent.replace(/\\s/g, \'\') == innerText; if(match) { var evt = document.createEvent("MouseEvents"); evt.initEvent("mouseup", true, true); button.dispatchEvent(evt); console.log(\'fired\'); return; } } } </script>')
  content = content.replace('style="', 'style="margin: auto; position: relative;')
  file.seek(0)
  file.write(content)
  file.close()
}
