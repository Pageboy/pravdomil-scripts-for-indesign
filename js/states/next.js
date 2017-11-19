"use strict";
// @include "./lib.js"
for (var _i = 0, _a = app.selection; _i < _a.length; _i++) {
    var item = _a[_i];
    if (item instanceof MultiStateObject) {
        switchObjectState(item, 1);
    }
}
