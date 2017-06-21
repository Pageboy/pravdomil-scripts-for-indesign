function optimalize_html(doc, files, opt) {
  if(!opt.keepFontFiles) {
    var fontFile = new File(files[0].parent + '/' + files[0].nameWithoutExt() + '-web-resources/script/FontData.js')
    if(fontFile.exists) { fontFile.remove() }
  }
  
  if(opt.mergePages) {
    var contents = []
    for(var i = 0; i < files.length; i++) {
      contents.push(get_body(files[i]))
      if(i > 0) { files[i].remove() }
    }
    
    merge_file(doc, opt, files, contents)
  }
  else {
    for(var i = 0; i < files.length; i++) {
      optimalize_file(doc, opt, files[i])
    }
  }
}

function merge_file(doc, opt, files, contents) {
  var file = files[0]
  file.lineFeed = 'Unix'
  file.encoding = 'UTF-8'
  file.open('e')
  
  var content = file.read()
  content = optimalize_head(doc, opt, file, content)
  content = content.substr(0, content.indexOf('<body'))
  content += '<body onload="typeof RegisterInteractiveHandlers==\'function\'&&RegisterInteractiveHandlers()" style="background-color: rgb(' + getBgColor(doc).join(', ') + ');">'
  content += contents.join('')
  
  file.seek(0)
  file.write(content)
  file.close()
}

function get_body(file) {
  file.lineFeed = 'Unix'
  file.encoding = 'UTF-8'
  file.open('r')
  
  var content = file.read()
  file.close()
  
  var start = content.indexOf('<body')
  var end = content.lastIndexOf('</body>')
  
  var div = '<div' + content.substr(start + 5, end - start - 5) + '</div>'
  div = div.replace('style="', 'style="margin: auto; position: relative; ')
  return div
}

function optimalize_file(doc, opt, file) {
  file.lineFeed = 'Unix'
  file.encoding = 'UTF-8'
  file.open('e')
  
  var content = file.read()
  content = optimalize_head(doc, opt, file, content)
  content = optimalize_body(doc, opt, file, content)
  
  file.seek(0)
  file.write(content)
  file.close()
}

function optimalize_body(doc, opt, file, content) {
  var extraStyle = 'margin: auto; position: relative; background-color: rgb(' + getBgColor(doc).join(', ') + '); '
  return content.replace('style="', 'style="' + extraStyle)
}

function optimalize_head(doc, opt, file, content) {
  var head = '<title>' + doc.fullName.nameWithoutExt() + '</title>\n' +
    '\t\t<meta name="viewport" content="width=device-width" />\n' +
    '\t\t<script>window.top.isPreviewFile = function() { return {} }</script>\n' +
    '\t\t<script>window.top.shouldNavigate = function() { return true }</script>\n' +
    '\t\t<script>window.top.onFrameDOMLoaded = function() { return true }</script>\n' +
    '\t\t<script>function press(innerText) { var butons = document.querySelectorAll(\'._idGenButton\'); for(var i = 0; i < butons.length; i++) { var button = butons[i]; var match = button.textContent.replace(/\\s/g, \'\') == innerText; if(match) { var evt = document.createEvent("Event"); evt.initEvent("ontouchend" in document.documentElement ? "touchend" : "mouseup", true, true); button.dispatchEvent(evt); console.log(\'fired\'); return; } } } </script>\n'
  
  if(!opt.keepFontFiles) {
    content = content.replace('<script src="' + file.nameWithoutExt() + '-web-resources/script/FontData.js" type="text/javascript"></script>', '')
  }
  
  return content.replace(/<title>[^<]*<\/title>/, head)
}
