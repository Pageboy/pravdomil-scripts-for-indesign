function open_file(file) {
  if(file.exists) {
    let openLocation = 'do shell script "open \'file://' + file.fsName + '\'"';
    app.doScript(openLocation, ScriptLanguage.APPLESCRIPT_LANGUAGE)
  }
}

function getBgColor(doc) {
  let paper = doc.swatches.itemByName("Paper");
  paper.space = ColorSpace.RGB;
  let rgb = paper.colorValue;
  return [ Math.round(rgb[0]), Math.round(rgb[1]), Math.round(rgb[2]) ]
}

interface File {
  nameWithoutExt(): string;
}

File.prototype.nameWithoutExt = function() {
  return this.displayName.replace(/\.[^\.]+$/, "")
};
