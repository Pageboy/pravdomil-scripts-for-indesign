function pravdomilExportBaseFilters(opt: PravdomilExportOptions) {
  opt.headFilters.push(pravdomilExportBaseHeadFilter);
  opt.bodyFilters.push(pravdomilExportBaseBodyFilter);
}

// noinspection JSUnusedLocalSymbols
function pravdomilExportBaseHeadFilter(opt: PravdomilExportOptions, i: number, head: string) {
  head = head.replace(/<title>[^>]*<\/title>/, `<title>${opt.name}</title>`);
  
  head = `\n\t\t<meta name="viewport" content="width=device-width" />` + head;
  
  // noinspection JSUnusedLocalSymbols
  head += `
<script>
function press(innerText) {
  var buttons = document.querySelectorAll('._idGenButton');
  for(var i = 0; i < buttons.length; i++) {
    var button = buttons[i];
    var match = button.textContent.replace(/\\s/g, '') === innerText;
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
</script>
`;
  
  head += `
<script>
window.top.isPreviewFile = function() { return {} };
window.top.shouldNavigate = function() { return true };
window.top.onFrameDOMLoaded = function() { return true };
</script>
`;
  head += `
<style>
html { background-color: rgb(${ getBgColor(opt.document).join(", ") }); }
</style>
`;
  
  return head;
}

// noinspection JSUnusedLocalSymbols
function pravdomilExportBaseBodyFilter(opt: PravdomilExportOptions, i: number, body: string) {
  
  return body;
}
