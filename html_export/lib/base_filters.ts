function pravdomilExportBaseFilters(opt: PravdomilExportOptions) {
  opt.headFilters.push(pravdomilExportBaseHeadFilter);
  opt.bodyFilters.push(pravdomilExportBaseBodyFilter);
}

// noinspection JSUnusedLocalSymbols
function pravdomilExportBaseHeadFilter(opt: PravdomilExportOptions, i: number, str: string) {
  str = str.replace(/<title>[^>]*<\/title>/, `<title>${opt.name}</title>`);
  
  str = `\n\t\t<meta name="viewport" content="width=device-width" />` + str;
  
  // noinspection JSUnusedLocalSymbols
  str += `
<script>
function press(innerText) {
  var buttons = document.querySelectorAll('._idGenButton');
  for(var i = 0; i < buttons.length; i++) {
    var button = buttons[i];
    var match = button.textContent.replace(/\\s/g, '') == innerText;
    if(match) {
      var evt = document.createEvent("Event");
      var name = "ontouchend" in document.documentElement ? "touchend" : "mouseup";
      evt.initEvent(name, true, true);
      button.dispatchEvent(evt);
      console.info("fired");
      return;
    }
  }
}
</script>`;
  
  str += `
<script>
window.top.isPreviewFile = function() { return {} };
window.top.shouldNavigate = function() { return true };
window.top.onFrameDOMLoaded = function() { return true };
</script>`;
  
  str += `
<style>
html { background-color: rgb(${ getBgColor(opt.document).join(", ") }); }
</style>`;
  
  return str;
}

// noinspection JSUnusedLocalSymbols
function pravdomilExportBaseBodyFilter(opt: PravdomilExportOptions, i: number, str: string) {
  
  return str;
}
