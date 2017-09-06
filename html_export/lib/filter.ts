function pravdomilExportFilterFiles(opt: PravdomilExportOptions) {
  if(opt.settings.mergePages) {
    let contents: string[] = [];
    for(let i = 0; i < opt.files.length; i++) {
      let body = pravdomilExportFilterBody(opt, i, content, true);
      contents.push(get_body(opt.files[i]));
      if(i > 0) { opt.files[i].remove() }
    }
    
    merge_file(opt.document, opt, opt.files, contents)
  }
  else {
    let i = 0;
    for(let file of opt.files) {
      let content = readFile(opt.files[i]);
      content = pravdomilExportFilterHead(opt, i, content);
      content = pravdomilExportFilterBody(opt, i, content);
      saveFile(opt.files[i], content);
    }
  }
}

function merge_file(doc: Document, opt: PravdomilExportOptions, files: File[], contents: string[]) {
  let file = files[0];
  file.lineFeed = "Unix";
  file.encoding = "UTF-8";
  file.open("e");
  
  let content = file.read();
  content = pravdomilExportFilterHead(opt, file, content);
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

function pravdomilExportFilterBody(opt: PravdomilExportOptions, i: number, content: string, returnFilteredPart = false) {
  return pravdomilExportDoFilter(opt, i, content, ['<body'], opt.bodyFilters, returnFilteredPart);
}

function pravdomilExportFilterHead(opt: PravdomilExportOptions, i: number, content: string, returnFilteredPart = false) {
  return pravdomilExportDoFilter(opt, i, content, ['<head>', '</head>'], opt.headFilters, returnFilteredPart);
}

function pravdomilExportDoFilter(opt: PravdomilExportOptions, i: number, content: string, match: string[], filters: PravdomilExportFilter[], returnFilteredPart = false) {
  let start = content.indexOf(match[0]);
  if(start == -1) {
    return content;
  }
  
  let end = content.indexOf(match[1]);
  
  let str;
  if(end == -1) {
    str = content.substr(start);
  }
  else {
    str = content.substr(start + match[0].length, end - start - match[0].length);
  }
  
  for(let filter of filters) {
    str = filter(opt, i, str);
  }
  
  if(returnFilteredPart) {
    return str;
  }
  else if(end == -1) {
    return content.substr(0, start) + str;
  }
  else {
    return content.substr(0, start + match[0].length) + str + content.substr(end);
  }
}
