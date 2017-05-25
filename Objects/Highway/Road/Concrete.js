class Concrete extends Object3D{
    /*Concreto del camino (parte inferior)*/
    constructor(color){
        super();

        var SWEPT_LEVELS = 70;
        var SHAPE_POINTS = 32;
        this.rows = SWEPT_LEVELS;
        this.cols = SHAPE_POINTS;

        this.shape = new ConcreteShape(SHAPE_POINTS);
        this.path = new RoadPath(curveController.controlPoints ,SWEPT_LEVELS);

        this.surface = new SweptSurface(this.shape, this.path);

        this.setIndexCreator(new VertexGrid(SWEPT_LEVELS, SHAPE_POINTS));
        this.setPosCreator(this.surface);
        this.setNormalCreator(this.surface);
        if (!color) this.setColorCreator(new Gray(SWEPT_LEVELS, SHAPE_POINTS));
        else this.setColorCreator(color);
    }
}
