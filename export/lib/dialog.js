function options_dialog(doc) {  
  var opt = get_options(doc)
  
  var dialog = new Window('dialog', 'Pravdomil Export to HTML')
  dialog.alignChildren = 'center'
  
  var group = dialog.add('panel')
  group.orientation = 'row'
  var allPages = group.add('radiobutton', undefined, 'All Pages')
  allPages.value = !opt.currentPage
  var currentPage = group.add('radiobutton', undefined, 'Current Page')
  currentPage.value = opt.currentPage
  
  var group = dialog.add('panel')
  group.orientation = 'row'
  var mergePages = group.add('radiobutton', undefined, 'Merge Pages')
  mergePages.value = opt.mergePages
  var splitPages = group.add('radiobutton', undefined, 'Split Pages')
  splitPages.value = !opt.mergePages
  
  var group = dialog.add('panel')
  group.alignChildren = 'left'
  group.orientation = 'column'
  
  var versioning = group.add('checkbox', undefined, 'Versioning')
  versioning.value = opt.versioning
  
  var keepFontFiles = group.add('checkbox', undefined, 'Keep Font Files')
  keepFontFiles.value = opt.keepFontFiles
  
  var group = dialog.add('group')
  group.alignment = 'right'
  group.add('button', undefined, 'Cancel')
  group.add('button', undefined, 'OK')
  
  if(dialog.show() == 1) {
    opt.currentPage = currentPage.value
    opt.versioning = versioning.value
    opt.separatePages = separatePages.value
    opt.keepFontFiles = keepFontFiles.value
    
    var path
    var outputFile = new File(opt.outputFile)
    if(outputFile.parent.exists) {
      path = outputFile.saveDlg()
    }
    else if(doc.saved) {
      path = doc.fullName.parent.saveDlg()
    }
    else {
      path = File.openDialog()
    }
    if(!path) { return }
    
    opt.outputFile = path
    save_options(doc, opt)
    return opt
  }
}

function get_options(doc) {
  var label = doc.extractLabel('pravdomil_html_export')
  var opt = myJSONparse(label)
  if(opt.keepFontFiles === undefined) { opt.keepFontFiles = true }
  if(opt.mergePages === undefined) { opt.mergePages = true }
  return opt
}

function save_options(doc, opt) {
  var label = myJSONstringify(opt)
  doc.insertLabel('pravdomil_html_export', label)
}
