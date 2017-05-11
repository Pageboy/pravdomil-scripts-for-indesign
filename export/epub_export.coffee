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
  
  date = new Date()
  date = date.getFullYear().toString().substr(2) + date.getMonth().toString().padStart(2, '0') + date.getDate().toString().padStart(2, '0')
  folder = new Folder folder + '/' + date
  if folder.exists is false then folder.create()
  
  file = new File folder + '/' + filename + '.html'
  
  doc.exportFile ExportFormat.HTMLFXL, file, (showDialog = false)
  
  conformFile file, title, filename
  
  i = 0
  while true
    i++
    fileWithNumber = new File folder + '/' + filename + '-' + i + '.html'
    if fileWithNumber.exists is false then break
    conformFile fileWithNumber, title, filename + '-' + i
  
  appendix = app.activeWindow.activePage.name - 1
  appendix = if !appendix then '' else '-' + appendix
  file = new File folder + '/' + filename + appendix + '.html'
  openLocation = 'tell application "System Events" to open location "file://' + file.relativeURI + '"'
  app.doScript openLocation, ScriptLanguage.applescriptLanguage
  
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
    <script>
    function press(innerText) {
      var butons = document.querySelectorAll(\'._idGenButton\');
      for(var i = 0; i < butons.length; i++) {
        var button = butons[i];
        var match = button.textContent.replace(/\\s/g, \'\') == innerText;
        if(match) {
          var evt = document.createEvent("MouseEvents");
          evt.initEvent("mouseup", true, true);
          button.dispatchEvent(evt);
          console.log(\'fired\');
          return;
        }
      }
    }
    </script>
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

String::padStart = (targetLength, padString) ->
  targetLength = targetLength >> 0
  padString = String(padString or ' ')
  if @length > targetLength
    String this
  else
    targetLength = targetLength - (@length)
    if targetLength > padString.length
      padString += padString.repeat(targetLength / padString.length)
    padString.slice(0, targetLength) + String(this)

main()
