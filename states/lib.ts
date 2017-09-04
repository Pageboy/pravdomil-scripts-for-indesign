/// <reference path="../node_modules/types-for-adobe/InDesign/2015.3/index.d.ts" />

function switchObjectState(obj: MultiStateObject, direction: number) {
  obj.activeStateIndex = modulo(obj.activeStateIndex + direction, obj.states.length);
  obj.select();
}

function modulo(a: number, b: number) {
  return (a % b + b) % b;
}
