interface File {
    nameWithoutExt(): string;
}

File.prototype.nameWithoutExt = function() {
    return this.name.replace(/\.[^.]+$/, "");
};

// noinspection JSUnusedGlobalSymbols
interface String {
    trim(): string;
    padStart(targetLength: number, padString?: string): string;
    padEnd(targetLength: number, padString?: string): string;
    repeat(count: number): string;
}

String.prototype.trim = function() {
    return this.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, "");
};

String.prototype.padStart = function(targetLength: number, padString = " ") {
    if (this.length > targetLength) {
        return String(this);
        
    } else {
        targetLength = targetLength - this.length;
        if (targetLength > padString.length) {
            padString += padString.repeat(targetLength / padString.length);
        }
        return padString.slice(0, targetLength) + String(this);
    }
};

String.prototype.padEnd = function padEnd(targetLength: number, padString = " ") {
    if (this.length > targetLength) {
        return String(this);
        
    } else {
        targetLength = targetLength - this.length;
        if (targetLength > padString.length) {
            padString += padString.repeat(targetLength / padString.length);
        }
        return String(this) + padString.slice(0, targetLength);
    }
};

String.prototype.repeat = function(count: number) {
    count = Math.floor(count);
    const str = String(this);
    
    if (str.length == 0 || count == 0) {
        return "";
    }
    
    let rpt = "";
    for (let i = 0; i < count; i++) {
        rpt += str;
    }
    return rpt;
};
