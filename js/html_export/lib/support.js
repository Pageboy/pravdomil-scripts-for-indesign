"use strict";
function openFile(file) {
    if (file.exists) {
        var openLocation = 'do shell script "open \'file://' + file.fsName + '\'"';
        app.doScript(openLocation, ScriptLanguage.APPLESCRIPT_LANGUAGE);
    }
}
function getBgColor(document) {
    var paper = document.swatches.itemByName("Paper");
    paper.space = ColorSpace.RGB;
    var rgb = paper.colorValue;
    return [Math.round(rgb[0]), Math.round(rgb[1]), Math.round(rgb[2])];
}
// noinspection JSUnusedGlobalSymbols
function trace(obj) {
    var out = obj + "\n";
    for (var key in obj) {
        // noinspection JSUnfilteredForInLoop
        out += key + "\t\t" + obj[key] + "\n";
    }
    alert(out);
}
function getActivePage() {
    if (app.activeWindow instanceof LayoutWindow) {
        var value = parseInt(app.activeWindow.activePage.name);
        return isNaN(value) ? undefined : value - 1;
    }
}
function readFile(file) {
    file.lineFeed = 'Unix';
    file.encoding = 'UTF-8';
    file.open('r');
    file.seek(0);
    var content = file.read();
    file.close();
    return content;
}
function saveFile(file, content) {
    file.lineFeed = 'Unix';
    file.encoding = 'UTF-8';
    file.open('w');
    file.seek(0);
    file.write(content);
    file.close();
}
function myJSONParse(str) {
    try {
        return eval(str);
    }
    catch (e) {
    }
}
function myJSONStringify(obj) {
    return obj.toSource();
}
