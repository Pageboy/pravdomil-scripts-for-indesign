function nudge(arg) {
  let objects = app.activeDocument.selection;
  let deltaX = arg[0];
  let deltaY = arg[1];
  
  for(let i = 0; i < objects.length; i++) {
    apply(objects[i], deltaX, deltaY)
  }
}

function resize(arg) {
  let objects = app.activeDocument.selection;
  let deltaX = arg[0];
  let deltaY = arg[1];
  
  for(let i = 0; i < objects.length; i++) {
    apply(objects[i], deltaX, deltaY, true)
  }
}

function apply(object, deltaX, deltaY, resize) {
  // [y1, x1, y2, x2]
  let bounds = object.visibleBounds;
  
  bounds[0] = Math.round(bounds[0] / 8 + (resize ? 0 : deltaY * 2)) * 8;
  bounds[1] = Math.round(bounds[1] / 8 + (resize ? 0 : deltaX * 2)) * 8;
  bounds[2] = Math.round(bounds[2] / 8 + deltaY * 2) * 8;
  bounds[3] = Math.round(bounds[3] / 8 + deltaX * 2) * 8;
  
  object.move([bounds[1], bounds[0]]);
  
  if(object instanceof GraphicLine) { return }
  
  let width = Math.max(bounds[3] - bounds[1], 8);
  let height = Math.max(bounds[2] - bounds[0], 8);
  
  object.resize(
    CoordinateSpaces.INNER_COORDINATES, AnchorPoint.TOP_LEFT_ANCHOR,
    ResizeMethods.REPLACING_CURRENT_DIMENSIONS_WITH,
    [width, height]
  )
}
