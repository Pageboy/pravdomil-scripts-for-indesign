function open_file(file) {
  if(file.exists) {
    let openLocation = 'do shell script "open \'file://' + file.fsName + '\'"';
    app.doScript(openLocation, ScriptLanguage.applescriptLanguage)
  }
}

function getBgColor(doc) {
  let paper = doc.swatches.itemByName('Paper');
  paper.space = ColorSpace.RGB;
  let rgb = paper.colorValue;
  return [ Math.round(rgb[0]), Math.round(rgb[1]), Math.round(rgb[2]) ]
}

File.prototype.nameWithoutExt = function() {
  return this.displayName.replace(/\.[^\.]+$/, '')
};
