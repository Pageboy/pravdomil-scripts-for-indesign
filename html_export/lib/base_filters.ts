function pravdomilExportBaseFilters(opt: PravdomilExportOptions) {
  opt.headFilters.push(pravdomilExportBaseHeadFilter);
  opt.bodyFilters.push(pravdomilExportBaseBodyFilter);
}

// noinspection JSUnusedLocalSymbols
function pravdomilExportBaseHeadFilter(opt: PravdomilExportOptions, i: number, head: string) {
  head = head.replace(/<title>[^>]*<\/title>/, `<title>${opt.name}</title>`);
  
  head = head + `<meta name="viewport" content="width=device-width" />`;
  
  head = head + `<script>
window.top.isPreviewFile = function() { return {} };
window.top.shouldNavigate = function() { return true };
window.top.onFrameDOMLoaded = function() { return true };
</script>`;
  
  // noinspection JSUnusedLocalSymbols
  head = head + `<script>
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
</script>`;
  
  return head;
}

// noinspection JSUnusedLocalSymbols
function pravdomilExportBaseBodyFilter(opt: PravdomilExportOptions, i: number, body: string) {
  let bg = getBgColor(opt.document).join(", ");
  let extraStyle = "margin: auto; position: relative; background-color: rgb(" + bg + "); ";
  body = body.replace('style="', 'style="' + extraStyle);
  
  return body;
}
