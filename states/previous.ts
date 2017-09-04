//@include "./lib.js"

for(let item of app.selection as Object[]) {
  if(item instanceof MultiStateObject) {
    switchObjectState(item, -1);
  }
}
