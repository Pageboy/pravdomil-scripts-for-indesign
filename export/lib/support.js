function open_page(file, currentPage) {
  try {
    var filepath = file.fullName.replace(/\.html$/, (currentPage - 1 ? '-' + currentPage - 1 : '') + '.html')
    var file = new File(filepath)
    var openLocation = 'tell application "System Events" to open location "file://' + file.fsName + '"'
    app.doScript(openLocation, ScriptLanguage.applescriptLanguage)
  }
  catch (e) {
    
  }
}
