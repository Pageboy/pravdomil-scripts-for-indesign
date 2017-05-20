function options_dialog(doc) {  
  var opt = get_options(doc)
  
  var dialog = new Window('dialog', 'Pravdomil Export to HTML')
  dialog.alignChildren = 'center'
  
  var group = dialog.add('group')
  group.add('statictext', undefined, 'Output File')
  var outputPath = group.add('edittext', undefined, 'html_export/index.html')
  outputPath.characters = 20
  outputPath.text = opt.outputPath || ''
  
  var browse = group.add('button', undefined, 'Browse')
  browse.onClick = function() {
    var path = doc.saved ? doc.filePath.saveDlg() : File.openDialog()
    if(path) { outputPath.text = path }
  }
  
  var group = dialog.add('group')
  group.alignChildren = 'left'
  group.orientation = 'column'
  
  var versioning = group.add('checkbox', undefined, 'Versioning')
  versioning.value = opt.versioning
  
  var separatePages = group.add('checkbox', undefined, 'Pages to Separate Files')
  separatePages.value = opt.separatePages
  
  var keepFontFiles = group.add('checkbox', undefined, 'Keep Font Files')
  keepFontFiles.value = opt.keepFontFiles
  
  var group = dialog.add('group')
  group.alignment = 'right'
  group.add('button', undefined, 'Cancel')
  group.add('button', undefined, 'OK')
  
  if(dialog.show() == 1) {
    opt.outputPath = outputPath.text
    opt.versioning = versioning.value
    opt.separatePages = separatePages.value
    opt.keepFontFiles = keepFontFiles.value
    save_options(doc, opt)
    return opt
  }
}

function get_options(doc) {
  var label = doc.extractLabel('pravdomil_html_export')
  var opt = myJSONparse(label)
  if(opt.keepFontFiles === undefined) { opt.keepFontFiles = true }
  return opt
}

function save_options(doc, opt) {
  var label = myJSONstringify(opt)
  doc.insertLabel('pravdomil_html_export', label)
}
