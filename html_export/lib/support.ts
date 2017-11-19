function openFile(file: File) {
    if (file.exists) {
        const openLocation = 'do shell script "open \'file://' + file.fsName + '\'"';
        app.doScript(openLocation, ScriptLanguage.APPLESCRIPT_LANGUAGE);
    }
}

function getBgColor(document: Document) {
    const paper = document.swatches.itemByName("Paper") as Color;
    paper.space = ColorSpace.RGB;
    const rgb = paper.colorValue;
    return [ Math.round(rgb[0]), Math.round(rgb[1]), Math.round(rgb[2]) ];
}

// noinspection JSUnusedGlobalSymbols
function trace(obj: any) {
    let out = obj + "\n";
    
    for (const key in obj) {
        // noinspection JSUnfilteredForInLoop
        out += key + "\t\t" + obj[key] + "\n";
    }
    
    alert(out);
}

function getActivePage() {
    if (app.activeWindow instanceof LayoutWindow) {
        const value = parseInt(app.activeWindow.activePage.name);
        return isNaN(value) ? undefined : value - 1;
    }
}

function readFile(file: File) {
    file.lineFeed = "Unix";
    file.encoding = "UTF-8";
    file.open("r");
    file.seek(0);
    const content = file.read();
    file.close();
    return content;
}

function saveFile(file: File, content: string) {
    file.lineFeed = "Unix";
    file.encoding = "UTF-8";
    file.open("w");
    file.seek(0);
    file.write(content);
    file.close();
}

function myJSONParse(str: string): any {
    try {
        return eval(str);
        
    } catch (e) {
        
    }
}

function myJSONStringify(obj: object): string {
    return obj.toSource();
}
