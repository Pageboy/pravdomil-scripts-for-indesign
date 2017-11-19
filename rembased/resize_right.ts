// @include "./lib.js"

app.doScript(function() {
    for (const item of app.selection as object[]) {
        rembasedApply(item as PageItem, .5, 0, true);
    }
}, ScriptLanguage.JAVASCRIPT, undefined, UndoModes.ENTIRE_SCRIPT, "Resize");
