function rembasedApply(object: PageItem, deltaX: number, deltaY: number, resize: boolean) {
    // [y1, x1, y2, x2]
    const bounds = object.visibleBounds as [number, number, number, number];
    
    bounds[0] = Math.round(bounds[0] / 8 + (resize ? 0 : deltaY * 2)) * 8;
    bounds[1] = Math.round(bounds[1] / 8 + (resize ? 0 : deltaX * 2)) * 8;
    bounds[2] = Math.round(bounds[2] / 8 + deltaY * 2) * 8;
    bounds[3] = Math.round(bounds[3] / 8 + deltaX * 2) * 8;
    
    object.move([bounds[1], bounds[0]]);
    
    if (object instanceof GraphicLine) { return; }
    
    const width = Math.max(bounds[3] - bounds[1], 8);
    const height = Math.max(bounds[2] - bounds[0], 8);
    
    object.resize(
        CoordinateSpaces.INNER_COORDINATES, AnchorPoint.TOP_LEFT_ANCHOR,
        ResizeMethods.REPLACING_CURRENT_DIMENSIONS_WITH,
        [width, height],
    );
}
