function pravdomilExportFilterFiles(opt: PravdomilExportOptions) {
    if (opt.settings.mergePages) {
        const bodies: string[] = [];
        let i = -1;
        for (const file of opt.files) {
            i++;
            if (i === 0) {
                continue;
            }
            
            const content = readFile(file);
            file.remove();
            
            const body = pravdomilExportFilterBody(opt, i, content, true);
            bodies.push(body.substr(6));
        }
        opt.files.splice(1);
        
        const file = opt.file;
        let content = readFile(file);
        
        content = pravdomilExportFilterHead(opt, 0, content);
        content = pravdomilExportFilterBody(opt, 0, content);
        content += bodies.join("");
        
        saveFile(file, content);
        
    } else {
        let i = -1;
        for (const file of opt.files) {
            i++;
            
            let content = readFile(file);
            
            content = pravdomilExportFilterHead(opt, i, content);
            content = pravdomilExportFilterBody(opt, i, content);
            
            saveFile(file, content);
        }
    }
}

function pravdomilExportFilterBody(opt: PravdomilExportOptions, i: number, content: string, returnFilteredPart = false) {
    return pravdomilExportFilterDo(opt, i, content, ["<body"], opt.bodyFilters, returnFilteredPart);
}

function pravdomilExportFilterHead(opt: PravdomilExportOptions, i: number, content: string, returnFilteredPart = false) {
    return pravdomilExportFilterDo(opt, i, content, ["<head>", "</head>"], opt.headFilters, returnFilteredPart);
}

function pravdomilExportFilterDo(opt: PravdomilExportOptions, i: number, content: string, match: string[], filters: PravdomilExportFilter[], returnFilteredPart = false) {
    const start = content.indexOf(match[0]);
    if (start === -1) {
        return content;
    }
    
    const end = content.indexOf(match[1]);
    
    let str;
    if (end === -1) {
        str = content.substr(start);
    } else {
        str = content.substr(start + match[0].length, end - start - match[0].length);
    }
    
    for (const filter of filters) {
        str = filter(opt, i, str);
    }
    
    if (returnFilteredPart) {
        return str;
        
    } else if (end === -1) {
        return content.substr(0, start) + str;
        
    } else {
        return content.substr(0, start + match[0].length) + str + content.substr(end);
    }
}
