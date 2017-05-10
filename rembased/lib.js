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
  
  for(var i = 0; i < bounds.length; i++) {
    bounds[i] = Math.round(bounds[i] / 8) * 8
  }
  
  if(object.visibleBounds[0] + object.strokeWeight == object.visibleBounds[2]) {
    bounds[2] = bounds[0] + object.strokeWeight
  }
  
  if(deltaX) {
    if(!resize) { bounds[1] += deltaX * 16 }
    bounds[3] += deltaX * 16
  }
  
  if(deltaY) {
    if(!resize) { bounds[0] += deltaY * 16 }
    bounds[2] += deltaY * 16
  }
  
  object.visibleBounds = bounds
}
