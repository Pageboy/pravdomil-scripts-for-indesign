"use strict";
function pravdomilExportBaseFilters(opt) {
    opt.headFilters.push(pravdomilExportBaseHeadFilter);
    opt.bodyFilters.push(pravdomilExportBaseBodyFilter);
}
// noinspection JSUnusedLocalSymbols
function pravdomilExportBaseHeadFilter(opt, i, str) {
    str = str.replace(/<title>[^>]*<\/title>/, "<title>" + opt.name + "</title>");
    str = "\n\t\t<meta name=\"viewport\" content=\"width=device-width\" />" + str;
    // noinspection JSUnusedLocalSymbols
    str += "<script>\nfunction press(innerText) {\n  var buttons = document.querySelectorAll('._idGenButton');\n  for(var i = 0; i < buttons.length; i++) {\n    var button = buttons[i];\n    var match = button.textContent.replace(/\\s/g, '') == innerText;\n    if(match) {\n      var evt = document.createEvent(\"Event\");\n      var name = \"ontouchend\" in document.documentElement ? \"touchend\" : \"mouseup\";\n      evt.initEvent(name, true, true);\n      button.dispatchEvent(evt);\n      console.info(\"fired\");\n      return;\n    }\n  }\n}\n</script>\n";
    str += "<script>\nwindow.top.isPreviewFile = function() { return {} };\nwindow.top.shouldNavigate = function() { return true };\nwindow.top.onFrameDOMLoaded = function() { return true };\nif(typeof RegisterInteractiveHandlers == \"function\") {\n  window.addEventListener(\"load\", RegisterInteractiveHandlers);\n}\n</script>\n";
    str += "<style>\nhtml { background-color: rgb(" + getBgColor(opt.document).join(", ") + "); }\n</style>\n";
    return str;
}
// noinspection JSUnusedLocalSymbols
function pravdomilExportBaseBodyFilter(opt, i, str) {
    str = "<body>\n\t" + "<div" + str.substr(5);
    str = str.substr(0, str.length - 18) + "\n\t</div>";
    str = str.replace('style="', 'style="margin:auto;position:relative;');
    return str;
}
