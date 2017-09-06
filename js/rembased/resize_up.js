"use strict";
//@include "./lib.js"
app.doScript(function () {
    for (var _i = 0, _a = app.selection; _i < _a.length; _i++) {
        var item = _a[_i];
        rembasedApply(item, 0, -.5, true);
    }
}, ScriptLanguage.JAVASCRIPT, undefined, UndoModes.ENTIRE_SCRIPT, "Resize");
