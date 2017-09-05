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
  if(opt.settings.versioning) {
    opt.file = new File(opt.file.parent + "/" + versioningString() + "/" + opt.file.displayName);
    
    if(!opt.file.parent.exists) {
      opt.file.parent.create();
    }
  }
}
