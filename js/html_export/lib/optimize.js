"use strict";
function pravdomilExportOptimize(opt) {
    if (opt.settings.mergePages) {
        var contents = [];
        for (var i = 0; i < opt.files.length; i++) {
            contents.push(get_body(opt.files[i]));
            if (i > 0) {
                opt.files[i].remove();
            }
        }
        merge_file(opt.document, opt, opt.files, contents);
    }
    else {
        var i = 0;
        for (var _i = 0, _a = opt.files; _i < _a.length; _i++) {
            var file = _a[_i];
            pravdomilExportFilterFile(opt, i++);
        }
    }
}
function merge_file(doc, opt, files, contents) {
    var file = files[0];
    file.lineFeed = "Unix";
    file.encoding = "UTF-8";
    file.open("e");
    var content = file.read();
    content = pravdomilExportFilterHead(opt, file, content);
    content = content.substr(0, content.indexOf("<body"));
    content += '<body onload="typeof RegisterInteractiveHandlers==\'function\'&&RegisterInteractiveHandlers()" style="background-color: rgb(' + getBgColor(doc).join(', ') + ');">';
    content += contents.join("");
    file.seek(0);
    file.write(content);
    file.close();
}
function get_body(file) {
    file.lineFeed = "Unix";
    file.encoding = "UTF-8";
    file.open("r");
    var content = file.read();
    file.close();
    var start = content.indexOf("<body");
    var end = content.lastIndexOf("</body>");
    var div = "<div" + content.substr(start + 5, end - start - 5) + "</div>";
    div = div.replace('style="', 'style="margin: auto; position: relative; ');
    return div;
}
function pravdomilExportFilterFile(opt, i) {
    var content = readFile(opt.files[i]);
    content = pravdomilExportFilterHead(opt, i, content);
    content = pravdomilExportFilterBody(opt, i, content);
    saveFile(opt.files[i], content);
}
function pravdomilExportFilterBody(opt, i, content) {
    return pravdomilExportDoFilter(opt, i, content, /<body.*$/, opt.bodyFilters);
}
function pravdomilExportFilterHead(opt, i, content) {
    return pravdomilExportDoFilter(opt, i, content, /<head>.*<\/head>/, opt.headFilters);
}
function pravdomilExportDoFilter(opt, i, content, regex, filters) {
    var match = content.match(regex);
    if (match) {
        var str = match[0];
        for (var _i = 0, filters_1 = filters; _i < filters_1.length; _i++) {
            var filter = filters_1[_i];
            str = filter(opt, i, str);
        }
        return content.replace(regex, str);
    }
    return content;
}
