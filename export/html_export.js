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
  
  var file = new File(opt.outputFile)
  if(opt.versioning) {
    file = new File(file.parent + '/' + versionString() + '/' + file.name)
  }
  
  doc.exportFile(ExportFormat.HTMLFXL, file, true)
  
  open_page(file, app.activeWindow.activePage.name)
}

function optimalize_export(doc, file, opt) {
  var i = 0
  while(true) {
    i++
    var fileWithNumber = new File(folder + '/' + filename + '-' + i + '.html')
    if(fileWithNumber.exists === false) { break }
    conformFile(fileWithNumber, title, filename + '-' + i)
  }
  
  file.open('e')
  var content = file.read()
  content = content.replace('<title>' + filename + '</title>', '<title>' + title + '</title> <meta name="viewport" content="width=device-width" /> <script>window.top.isPreviewFile = function() { return {} }</script> <script>window.top.shouldNavigate = function() { return true }</script><script>window.top.onFrameDOMLoaded = function() { return true }</script> <script> function press(innerText) { var butons = document.querySelectorAll(\'._idGenButton\'); for(var i = 0; i < butons.length; i++) { var button = butons[i]; var match = button.textContent.replace(/\\s/g, \'\') == innerText; if(match) { var evt = document.createEvent("MouseEvents"); evt.initEvent("mouseup", true, true); button.dispatchEvent(evt); console.log(\'fired\'); return; } } } </script>')
  content = content.replace('style="', 'style="margin: auto; position: relative;')
  file.seek(0)
  file.write(content)
  file.close()
}
