interface String {
  trim(): string;
  padStart(targetLength: number, padString: string): string;
}

String.prototype.trim = function() { return this.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, "") };

String.prototype.padStart = function(targetLength, padString) {
  targetLength = targetLength | 0;
  padString = String(padString || " ");
  if(this.length > targetLength) {
    return String(this)
  } else {
    targetLength = targetLength - this.length;
    if(targetLength > padString.length) {
      padString += padString.repeat(targetLength / padString.length)
    }
    return padString.slice(0, targetLength) + String(this)
  }
};

function versionString() {
  let date = new Date();
  return date.getFullYear().toString().substr(2)
    + date.getMonth().toString().padStart(2, "0")
    + date.getDate().toString().padStart(2, "0")
}
