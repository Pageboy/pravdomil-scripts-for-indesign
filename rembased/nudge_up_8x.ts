// @include "./lib.js"

app.doScript(function() {
    for (const item of app.selection as object[]) {
        rembasedApply(item as PageItem, 0, -.5 * 8, false);
    }
}, ScriptLanguage.JAVASCRIPT, undefined, UndoModes.ENTIRE_SCRIPT, "Nudge");
