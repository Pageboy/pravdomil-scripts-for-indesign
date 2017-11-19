//@include "./lib.js"

app.doScript(function() {
    for(let item of app.selection as Object[]) {
        rembasedApply(item as PageItem, -.5, 0, true)
    }
}, ScriptLanguage.JAVASCRIPT, undefined, UndoModes.ENTIRE_SCRIPT, "Resize");
