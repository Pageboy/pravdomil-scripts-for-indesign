main()

function main() {
  // no documents open
  if(!app.activeDocument) { return }
  
  const doc = app.activeDocument
  // document not saved
  if(!doc.fullName) { return }
  
  group(doc)
  html_export(doc)
  doc.undo()
}

function group(doc) {
  for(var i = 0; i < doc.pages.length; i++) {
    const page = doc.pages[i]
    const items = page.allPageItems
    const group = []
    
    for(var i = 0; i < items.length; i++) {
      if(items[i].parent.constructor == Spread) {
        group.push(items[i])
      }
    }
    
    if(group.length > 1) {
      page.groups.add(group)
    }
  }
}

function ungroup(doc) {
  for(var i = 0; i < doc.pages.length; i++) {
    const groups = doc.pages[i].groups
    if(groups.length) {
      groups.firstItem().ungroup()
    }
  }
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
  const showDialog = true
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
