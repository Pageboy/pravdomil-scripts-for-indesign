//@include "./lib.js" 

app.doScript(function() {
  for(let item of app.selection as Object[]) {
    rembasedApply(item as PageItem, 0, .5, false)
  }
}, ScriptLanguage.JAVASCRIPT, undefined, UndoModes.ENTIRE_SCRIPT, "Nudge")
