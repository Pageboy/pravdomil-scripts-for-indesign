interface PravdomilExportOptionsSettings {
  versioning?: boolean;
}

function versioningString() {
  let date = new Date();
  return date.getFullYear().toString().substr(2)
    + date.getMonth().toString().padStart(2, "0")
    + date.getDate().toString().padStart(2, "0")
}

function versioning(opt: PravdomilExportOptions) {
  let file = new File(opt.settings.outputFile);
  if(opt.settings.versioning) {
    file = new File(file.parent + "/" + versioningString() + "/" + file.displayName);
    if(!file.parent.exists) { file.parent.create() }
  }
}
