main()

function main() {
  // no documents open
  if(!app.activeDocument) { return }
  
  const doc = app.activeDocument
  // document not saved
  if(!doc.fullName) { return }
  
  const groups = group(doc)
  html_export(doc)
  undo(doc, groups)
}

function group(doc) {
  var undoCount = 0
  for(var p = 0; p < doc.pages.length; p++) {
    var page = doc.pages[p]
    var items = page.allPageItems
    var group = []
    
    for(var i = 0; i < items.length; i++) {
      var item = items[i]
      if(item.parent.constructor == Spread) {
        if(item.locked) {
          item.locked = false
          undoCount++
        }
        group.push(item)
      }
    }
    
    if(group.length > 1) {
      page.groups.add(group)
      undoCount++
    }
  }
  return undoCount
}

function undo(doc, groups) {
  for(var i = 0; i < groups; i++) { doc.undo() }
}

function html_export(doc) {
  const folder = findDomain(doc.filePath)
  if(!folder) {
    alert('No domain folder found')
    return
  }
  
  const basename = doc.fullName.displayName
  const basenameWithoutExt = basename.substring(0, basename.lastIndexOf('.'))
  
  const parts = basenameWithoutExt.split('-')
  const title = parts[0]
  const filename = (parts.length == 1) ? 'index' : parts.slice(1).join('-')
  
  const file = new File(folder + '/' + filename + '.html')
  const showDialog = false
  doc.exportFile(ExportFormat.HTML, file, showDialog)
  
  file.open('e')
  var content = file.read()
  content = content.replace(
    '<title>' + filename + '</title>',
    '<title>' + title + '</title>\r\n\t\t<meta name="viewport" content="width=device-width" />'
  )
  file.seek(0)
  file.write(content)
  file.close()
}

function findDomain(path) {
  const files = new Folder(path).getFiles()
  for(var i = 0; i < files.length; i++) {
    if(files[i].displayName.match(/\.(cz|com)$/)) {
      return files[i]
    }
  }
}
