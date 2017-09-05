function pravdomilExportOptimize(opt: PravdomilExportOptions) {
  if(opt.settings.mergePages) {
    let contents: string[] = [];
    for(let i = 0; i < opt.files.length; i++) {
      contents.push(get_body(opt.files[i]));
      if(i > 0) { opt.files[i].remove() }
    }
    
    merge_file(opt.document, opt, opt.files, contents)
  }
  else {
    for(let file of opt.files) {
      pravdomilExportOptimizeFile(opt, file);
    }
  }
}

function merge_file(doc: Document, opt: PravdomilExportOptions, files: File[], contents: string[]) {
  let file = files[0];
  file.lineFeed = "Unix";
  file.encoding = "UTF-8";
  file.open("e");
  
  let content = file.read();
  content = pravdomilExportOptimizeHead(opt, file, content);
  content = content.substr(0, content.indexOf("<body"));
  content += '<body onload="typeof RegisterInteractiveHandlers==\'function\'&&RegisterInteractiveHandlers()" style="background-color: rgb(' + getBgColor(doc).join(', ') + ');">';
  content += contents.join("");
  
  file.seek(0);
  file.write(content);
  file.close()
}

function get_body(file: File) {
  file.lineFeed = "Unix";
  file.encoding = "UTF-8";
  file.open("r");
  
  let content = file.read();
  file.close();
  
  let start = content.indexOf("<body");
  let end = content.lastIndexOf("</body>");
  
  let div = "<div" + content.substr(start + 5, end - start - 5) + "</div>";
  div = div.replace('style="', 'style="margin: auto; position: relative; ');
  return div
}

function pravdomilExportOptimizeFile(opt: PravdomilExportOptions, file: File) {
  let content = readFile(file);
  content = pravdomilExportOptimizeHead(opt, file, content);
  content = pravdomilExportOptimizeBody(opt, file, content);
  saveFile(file, content);
}

function pravdomilExportOptimizeBody(opt: PravdomilExportOptions, file: File, content: string) {
  let bg = getBgColor(opt.document).join(", ");
  let extraStyle = "margin: auto; position: relative; background-color: rgb(" + bg + "); ";
  return content.replace('style="', 'style="' + extraStyle)
}

function pravdomilExportOptimizeHead(opt: PravdomilExportOptions, file: File, content: string) {
  let regex = /<head>.*<\/head>/;
  let match = content.match(regex);
  
  if(match) {
    let head = match[0];
    
    for(let filter of opt.headFilters) {
      head = filter(opt, i, head);
    }
    
    return content.replace(regex, head)
  }
  
  return content;
}
