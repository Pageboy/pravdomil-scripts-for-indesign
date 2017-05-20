function open_page(file, currentPage) {
  var suffix = (currentPage == 1) ? '' : '-' + (currentPage - 1)
  var file = new File(file.parent + '/' + file.nameWithoutExt() + suffix + '.html')
  
  var openLocation = 'tell application "System Events" to open location "file://' + file.fsName + '"'
  app.doScript(openLocation, ScriptLanguage.applescriptLanguage)
}

File.prototype.nameWithoutExt = function() {
  return this.name.replace(/\.[^\.]+$/, '')
}
