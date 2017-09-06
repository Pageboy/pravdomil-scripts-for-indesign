"use strict";
function switchObjectState(obj, direction) {
    obj.activeStateIndex = modulo(obj.activeStateIndex + direction, obj.states.length);
    obj.select();
}
function modulo(a, b) {
    return (a % b + b) % b;
}
