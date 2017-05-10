function nudge(arg) {
  var objects = app.activeDocument.selection
  var deltaX = arg[0]
  var deltaY = arg[1]
  
  for(var i = 0; i < objects.length; i++) {
    apply(objects[i], deltaX, deltaY)
  }
}

function resize(arg) {
  var objects = app.activeDocument.selection
  var deltaX = arg[0]
  var deltaY = arg[1]
  
  for(var i = 0; i < objects.length; i++) {
    apply(objects[i], deltaX, deltaY, true)
  }
}

function apply(object, deltaX, deltaY, resize) {
  // [y1, x1, y2, x2]
  var bounds = object.geometricBounds
  
  bounds[0] = Math.round(bounds[0] / 8) * 8
  bounds[1] = Math.round(bounds[1] / 8) * 8
  bounds[2] = Math.round(bounds[2] / 8 + deltaY) * 8
  bounds[3] = Math.round(bounds[3] / 8 + deltaX) * 8
  
  if(!resize) {
    bounds[1] += deltaX * 16
    bounds[0] += deltaY * 16
  }
  
  
  object.visibleBounds = bounds
}
