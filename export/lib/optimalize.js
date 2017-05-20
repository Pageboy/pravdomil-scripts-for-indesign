function optimalize_html(doc, file, opt) {
  if(!opt.keepFontFiles) {
    var fontFile = new File(file.parent + '/' + file.nameWithoutExt() + '-web-resources/script/FontData.js')
    if(fontFile.exists) { fontFile.remove() }
  }
  
  optimalize_file(doc, file, opt, file)
  
  if(opt.currentPage) { return }
  
  for(var i = 1; i < doc.pages.length; i++) {
    var f = new File(file.parent + '/' + file.nameWithoutExt() + '-' + i + '.html')
    optimalize_file(doc, f, opt, file)
  }
}

function optimalize_file(doc, file, opt, masterFile) {
  file.lineFeed = 'Unix'
  file.open('e')
  
  var content = file.read()
  var head = '<title>' + doc.fullName.nameWithoutExt() + '</title>' +
    '\t\t<meta name="viewport" content="width=device-width" />\n' +
    '\t\t<script>window.top.isPreviewFile = function() { return {} }</script>\n' +
    '\t\t<script>window.top.shouldNavigate = function() { return true }</script>\n' +
    '\t\t<script>window.top.onFrameDOMLoaded = function() { return true }</script>\n' +
    '\t\t<script>function press(innerText) { var butons = document.querySelectorAll(\'._idGenButton\'); for(var i = 0; i < butons.length; i++) { var button = butons[i]; var match = button.textContent.replace(/\\s/g, \'\') == innerText; if(match) { var evt = document.createEvent("MouseEvents"); evt.initEvent("mouseup", true, true); button.dispatchEvent(evt); console.log(\'fired\'); return; } } } </script>\n'
  
  content = content.replace('<title>' + file.nameWithoutExt() + '</title>', head)
  content = content.replace('style="', 'style="margin: auto; position: relative;')
  
  if(!opt.keepFontFiles) {
    content = content.replace('<script src="' + masterFile.nameWithoutExt() + '-web-resources/script/FontData.js" type="text/javascript"></script>', '')
  }
  
  file.seek(0)
  file.write(content)
  file.close()
}
