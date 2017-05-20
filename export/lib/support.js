function open_page(file, currentPage) {
  var suffix = (currentPage == 1) ? '' : '-' + (currentPage - 1)
  var filepath = file.fullName.replace(/\.html$/, suffix + '.html')
  var file = new File(filepath)
  var openLocation = 'tell application "System Events" to open location "file://' + file.fsName + '"'
  app.doScript(openLocation, ScriptLanguage.applescriptLanguage)
}
