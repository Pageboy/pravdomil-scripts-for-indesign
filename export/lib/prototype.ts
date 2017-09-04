interface String {
  trim(): string;
  padStart(targetLength: number, padString?: string): string;
  repeat(count: number): string;
}

String.prototype.trim = function() {
  return this.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, "");
};

String.prototype.padStart = function(targetLength: number, padString = " ") {
  if(this.length > targetLength) {
    return String(this)
  }
  else {
    targetLength = targetLength - this.length;
    if(targetLength > padString.length) {
      padString += padString.repeat(targetLength / padString.length)
    }
    return padString.slice(0, targetLength) + String(this)
  }
};

String.prototype.repeat = function(count: number) {
  count = Math.floor(count);
  let str = String(this);
  
  if (str.length == 0 || count == 0) {
    return '';
  }
  
  let rpt = '';
  for (let i = 0; i < count; i++) {
    rpt += str;
  }
  return rpt;
};

function versionString() {
  let date = new Date();
  return date.getFullYear().toString().substr(2)
    + date.getMonth().toString().padStart(2, "0")
    + date.getDate().toString().padStart(2, "0")
}
