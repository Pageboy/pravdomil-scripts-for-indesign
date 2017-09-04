function open_file(file) {
  if(file.exists) {
    var openLocation = 'do shell script "open \'file://' + file.fsName + '\'"';
    app.doScript(openLocation, ScriptLanguage.applescriptLanguage)
  }
}

function getBgColor(doc) {
  var paper = doc.swatches.itemByName('Paper');
  paper.space = ColorSpace.RGB;
  var rgb = paper.colorValue;
  return [ Math.round(rgb[0]), Math.round(rgb[1]), Math.round(rgb[2]) ]
}

File.prototype.nameWithoutExt = function() {
  return this.displayName.replace(/\.[^\.]+$/, '')
};
