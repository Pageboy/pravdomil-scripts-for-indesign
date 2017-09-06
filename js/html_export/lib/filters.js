"use strict";
function pravdomilExportFilters(opt, i, head) {
    var fix = "<script>\nwindow.top.isPreviewFile = function() { return {} };\nwindow.top.shouldNavigate = function() { return true };\nwindow.top.onFrameDOMLoaded = function() { return true };\n</script>";
    var press = "<script>\nfunction press(innerText) {\n  var buttons = document.querySelectorAll('._idGenButton');\n  for(var i = 0; i < buttons.length; i++) {\n    var button = buttons[i];\n    var match = button.textContent.replace(/\\s/g, '') === innerText;\n    if(match) {\n      var evt = document.createEvent(\"Event\");\n      var name = \"ontouchend\" in document.documentElement ? \"touchend\" : \"mouseup\";\n      evt.initEvent(name, true, true);\n      button.dispatchEvent(evt);\n      console.log(\"fired\");\n      return;\n    }\n  }\n}\n</script>";
    var head = [
        "<title>" + opt.document.name.replace(/\.indd/, "") + "</title>",
        "<meta name=\"viewport\" content=\"width=device-width\" />",
    ];
}
