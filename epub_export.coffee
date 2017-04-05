main = ->
  # no documents open
  if !app.activeDocument then return
  
  # our doc
  doc = app.activeDocument
  
  # document not saved
  if !doc.fullName then return
  
  epub_export doc
  return

epub_export = (doc) ->
  folder = findDomain doc.filePath
  if not folder then return alert 'No domain folder found'
  
  basename = doc.fullName.displayName
  basenameWithoutExt = basename.substring 0, basename.lastIndexOf '.'
  parts = basenameWithoutExt.split '-'
  
  title = parts[0].trim()
  filename = if parts.length == 1 then 'index' else parts.slice(1).join('-').trim()
  
  file = new File folder + '/' + filename + '.html'
  
  doc.exportFile ExportFormat.HTMLFXL, file, (showDialog = false)
  
  conformFile file, title, filename
  
  i = 0
  while true
    i++
    filenameWithNumber = filename + '-' + i
    file = new File folder + '/' + filenameWithNumber + '.html'
    if file.exists is false then break
    conformFile file, title, filenameWithNumber
  
  return

conformFile = (file, title, filename) ->
  file.open 'e'
  content = file.read()
  content = content.replace(
    '<title>' + filename + '</title>',
    '<title>' + title + '</title>
    <meta name="viewport" content="width=device-width" />
    <script>window.top.isPreviewFile = function() { return {} }</script>
    <script>window.top.shouldNavigate = function() { return true }</script>
  ')
  content = content.replace('style="', 'style="margin: auto; position: relative; ')
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
