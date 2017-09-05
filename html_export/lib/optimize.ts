function pravdomilExportOptimize(opt: PravdomilExportOptions) {
  if(!opt.settings.keepFontFiles) {
    let fontFile = new File(opt.files[0].parent + '/' + opt.files[0].nameWithoutExt() + '-web-resources/script/FontData.js');
    if(fontFile.exists) { fontFile.remove() }
  }
  
  if(opt.settings.mergePages) {
    let contents: string[] = [];
    for(let i = 0; i < opt.files.length; i++) {
      contents.push(get_body(opt.files[i]));
      if(i > 0) { opt.files[i].remove() }
    }
    
    merge_file(opt.document, opt, opt.files, contents)
  }
  else {
    for(let i = 0; i < opt.files.length; i++) {
      optimize_file(opt.document, opt, opt.files[i])
    }
  }
}

function merge_file(doc: Document, opt: PravdomilExportOptions, files: File[], contents: string[]) {
  let file = files[0];
  file.lineFeed = 'Unix';
  file.encoding = 'UTF-8';
  file.open('e');
  
  let content = file.read();
  content = optimize_head(doc, opt, file, content);
  content = content.substr(0, content.indexOf('<body'));
  content += '<body onload="typeof RegisterInteractiveHandlers==\'function\'&&RegisterInteractiveHandlers()" style="background-color: rgb(' + getBgColor(doc).join(', ') + ');">';
  content += contents.join('');
  
  file.seek(0);
  file.write(content);
  file.close()
}

function get_body(file: File) {
  file.lineFeed = 'Unix';
  file.encoding = 'UTF-8';
  file.open('r');
  
  let content = file.read();
  file.close();
  
  let start = content.indexOf('<body');
  let end = content.lastIndexOf('</body>');
  
  let div = '<div' + content.substr(start + 5, end - start - 5) + '</div>';
  div = div.replace('style="', 'style="margin: auto; position: relative; ');
  return div
}

function optimize_file(doc: Document, opt: PravdomilExportOptions, file: File) {
  file.lineFeed = 'Unix';
  file.encoding = 'UTF-8';
  file.open('e');
  
  let content = file.read();
  content = optimize_head(doc, opt, file, content);
  content = optimize_body(doc, opt, file, content);
  
  file.seek(0);
  file.write(content);
  file.close()
}

function optimize_body(doc: Document, opt: PravdomilExportOptions, file: File, content: string) {
  let extraStyle = 'margin: auto; position: relative; background-color: rgb(' + getBgColor(doc).join(', ') + '); ';
  return content.replace('style="', 'style="' + extraStyle)
}

function optimize_head(doc: Document, opt: PravdomilExportOptions, file: File, content: string) {
  let head = [
    '<title>' + doc.fullName.nameWithoutExt() + '</title>',
    '<meta name="viewport" content="width=device-width" />',
    '<script>window.top.isPreviewFile = function() { return {} }</script>',
    '<script>window.top.shouldNavigate = function() { return true }</script>',
    '<script>window.top.onFrameDOMLoaded = function() { return true }</script>',
    '<script>function press(innerText) { var buttons = document.querySelectorAll(\'._idGenButton\'); for(var i = 0; i < buttons.length; i++) { var button = buttons[i]; var match = button.textContent.replace(/\\s/g, \'\') == innerText; if(match) { var evt = document.createEvent("Event"); evt.initEvent("ontouchend" in document.documentElement ? "touchend" : "mouseup", true, true); button.dispatchEvent(evt); console.log(\'fired\'); return; } } } </script>'
  ];
  
  if(!opt.keepFontFiles) {
    content = content.replace('<script src="' + file.nameWithoutExt() + '-web-resources/script/FontData.js" type="text/javascript"></script>', '')
  }
  
  return content.replace(/<title>[^<]*<\/title>/, head.join("\n\t\t"))
}
