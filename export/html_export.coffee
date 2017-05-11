main = ->
  # no documents open
  if !app.activeDocument then return
  
  # our doc
  doc = app.activeDocument
  
  # document not saved
  if !doc.fullName then return
  
  undoCount = group doc
  html_export doc
  undo doc, undoCount
  return

group = (doc) ->
  undoCount = 0
  for page in doc.pages
    group = []
    
    for item in page.allPageItems
      if item.parent.constructor isnt Spread then continue
      
      if item.locked
        item.locked = false
        undoCount++
      
      group.push item
    
    if group.length > 1
      page.groups.add group
      undoCount++
    
  undoCount

undo = (doc, undoCount) ->
  doc.undo() for [0...undoCount]
  return

html_export = (doc) ->
  folder = findDomain doc.filePath
  if not folder then return alert 'No domain folder found'
  
  basename = doc.fullName.displayName
  basenameWithoutExt = basename.substring 0, basename.lastIndexOf '.'
  parts = basenameWithoutExt.split '-'
  
  title = parts[0].trim()
  filename = if parts.length == 1 then 'index' else parts.slice(1).join('-').trim()
  
  file = new File folder + '/' + filename + '.html'
  
  doc.exportFile ExportFormat.HTML, file, (showDialog = false)
  
  file.open 'e'
  content = file.read()
  content = content.replace('<title>' + filename + '</title>', '<title>' + title + '</title>\u000d\n\u0009\u0009<meta name="viewport" content="width=device-width" />')
  file.seek 0
  file.write content
  file.close()
  
  return

findDomain = (path) ->
  for file in new Folder(path).getFiles()
    if file.displayName.match(/\.(cz|com)$/) then return file
  
  return

String::trim = ->
  @replace /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, ''

main()
