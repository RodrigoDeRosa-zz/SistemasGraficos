class Asphalt extends Object3D{
    /*Asfalto del camino (parte superior)*/
    constructor(color){
        super();

        var SWEPT_LEVELS = 70;
        var SHAPE_POINTS = 8;

        this.shape = new AsphaltShape(SHAPE_POINTS);
        this.path = new RoadPath(curveController.controlPoints ,SWEPT_LEVELS);

        this.surface = new SweptSurface(this.shape, this.path);

        this.setIndexCreator(new VertexGrid(SWEPT_LEVELS, SHAPE_POINTS));
        this.setPosCreator(this.surface);
        this.setNormalCreator(this.surface);
        if (!color) this.setColorCreator(new DarkGray(SWEPT_LEVELS, SHAPE_POINTS));
        else this.setColorCreator(color);
    }
}
