// @include "./lib.js"

app.doScript(function() {
    for (const item of app.selection as object[]) {
        rembasedApply(item as PageItem, .5, 0, false);
    }
}, ScriptLanguage.JAVASCRIPT, undefined, UndoModes.ENTIRE_SCRIPT, "Nudge");
