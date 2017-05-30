function open_file(file) {
  if(file.exists) {
    var openLocation = 'tell application "System Events" to open location "file://' + file.fsName + '"'
    alert('HTML Export\nDone.')
    app.doScript(openLocation, ScriptLanguage.applescriptLanguage)
  }
}

File.prototype.nameWithoutExt = function() {
  return this.name.replace(/\.[^\.]+$/, '')
}
