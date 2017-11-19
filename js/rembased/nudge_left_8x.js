"use strict";
// @include "./lib.js"
app.doScript(function () {
    for (var _i = 0, _a = app.selection; _i < _a.length; _i++) {
        var item = _a[_i];
        rembasedApply(item, -.5 * 8, 0, false);
    }
}, ScriptLanguage.JAVASCRIPT, undefined, UndoModes.ENTIRE_SCRIPT, "Nudge");
