main()

function main() {
  // no documents open
  if(!app.activeDocument) { return }
  
  const doc = app.activeDocument
  // document not saved
  if(!doc.fullName) { return }
  
  group(doc)
  html_export(doc)
  ungroup(doc)
}

function group(doc) {
  for(var i = 0; i < doc.pages.length; i++) {
    const page = doc.pages[i]
    const items = page.allPageItems
    const group = []
    
    if(items.length <= 1) { return }
    
    for(var i = 0; i < items.length; i++) {
      if(items[i].parent.constructor == Spread) {
        group.push(items[i])
      }
    }
    
    page.groups.add(group)
  }
}

function ungroup(doc) {
  for(var i = 0; i < doc.pages.length; i++) {
    const groups = doc.pages[i].groups
    if(groups.length) { page.groups.firstItem().ungroup() }
  }
}

function html_export(doc) {
  const basename = doc.fullName.displayName
	const basenameWithoutExt = basename.substring(0, basename.lastIndexOf('.'))
  
  const root = new Folder(doc.filePath + '/html')
  root.create()
  
  const showDialog = true
	doc.exportFile(ExportFormat.HTML, new File(root + '/' + basenameWithoutExt + '.html'), showDialog)
}
