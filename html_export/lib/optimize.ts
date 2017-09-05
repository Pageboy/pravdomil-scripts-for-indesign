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
    let i = 0;
    for(let file of opt.files) {
      pravdomilExportFilterFile(opt, i++);
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

function pravdomilExportFilterFile(opt: PravdomilExportOptions, i: number) {
  let content = readFile(opt.files[i]);
  content = pravdomilExportOptimizeHead(opt, i, content);
  content = pravdomilExportOptimizeBody(opt, i, content);
  saveFile(opt.files[i], content);
}

function pravdomilExportOptimizeBody(opt: PravdomilExportOptions, i: number, content: string) {
  return pravdomilExportOptimizeDo(opt, i, content, /<body.*$/, opt.bodyFilters);
}

function pravdomilExportOptimizeHead(opt: PravdomilExportOptions, i: number, content: string) {
  return pravdomilExportOptimizeDo(opt, i, content, /<head>.*<\/head>/, opt.headFilters);
}

function pravdomilExportOptimizeDo(opt: PravdomilExportOptions, i: number, content: string, regex: RegExp, filters: PravdomilExportFilter[]) {
  let match = content.match(regex);

  if(match) {
    let str = match[0];
    
    for(let filter of filters) {
      str = filter(opt, i, str);
    }
    
    return content.replace(regex, str)
  }
  
  return content;
}
