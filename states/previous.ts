// @include "./lib.js"

for (const item of app.selection as object[]) {
    if (item instanceof MultiStateObject) {
        switchObjectState(item, -1);
    }
}
