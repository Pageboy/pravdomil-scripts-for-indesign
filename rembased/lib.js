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
  
  if(!resize) {
    bounds[0] = Math.round(bounds[0] / 8 + deltaY * 2) * 8
    bounds[1] = Math.round(bounds[1] / 8 + deltaX * 2) * 8
    
    object.move([bounds[1], bounds[0]])
  }
  else {
    bounds[0] = Math.round(bounds[0] / 8) * 8
    bounds[1] = Math.round(bounds[1] / 8) * 8
    bounds[2] = Math.round(bounds[2] / 8 + deltaY * 2) * 8
    bounds[3] = Math.round(bounds[3] / 8 + deltaX * 2) * 8
    object.move([bounds[1], bounds[0]])
    
    var width = bounds[3] - bounds[1]
    var height = bounds[2] - bounds[0]
    object.resize(
      CoordinateSpaces.INNER_COORDINATES, AnchorPoint.TOP_LEFT_ANCHOR,
      ResizeMethods.REPLACING_CURRENT_DIMENSIONS_WITH,
      [width, height]
    )
  }
}
