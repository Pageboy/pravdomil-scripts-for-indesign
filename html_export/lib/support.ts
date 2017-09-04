function openFile(file: File) {
  if(file.exists) {
    let openLocation = 'do shell script "open \'file://' + file.fsName + '\'"';
    app.doScript(openLocation, ScriptLanguage.APPLESCRIPT_LANGUAGE)
  }
}

function getBgColor(doc: Document) {
  let paper = doc.swatches.itemByName("Paper") as Color;
  paper.space = ColorSpace.RGB;
  let rgb = paper.colorValue;
  return [ Math.round(rgb[0]), Math.round(rgb[1]), Math.round(rgb[2]) ]
}

function versionString() {
  let date = new Date();
  return date.getFullYear().toString().substr(2)
    + date.getMonth().toString().padStart(2, "0")
    + date.getDate().toString().padStart(2, "0")
}

function myJSONParse(str: string): any {
  try {
    return eval(str);
  }
  catch (e) {

  }
  return {}
}

function myJSONStringify(obj: object): string {
  return obj.toSource();
}
