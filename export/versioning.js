var key = 'export_versioning'
app.activeDocument.insertLabel(key, prompt('Versioning?', app.activeDocument.extractLabel(key)))
