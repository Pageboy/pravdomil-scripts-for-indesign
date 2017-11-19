interface PravdomilExportOptionsSettings {
    versioning?: boolean;
}

function pravdomilExportVersioningString() {
    let date = new Date();
    return date.getFullYear().toString().substr(2)
        + date.getMonth().toString().padStart(2, "0")
        + date.getDate().toString().padStart(2, "0")
}

function pravdomilExportVersioning(opt: PravdomilExportOptions) {
    if(opt.settings.versioning) {
        opt.file = new File(opt.file.parent + "/" + pravdomilExportVersioningString() + "/" + opt.file.name);
        
        if(!opt.file.parent.exists) {
            opt.file.parent.create();
        }
    }
}
