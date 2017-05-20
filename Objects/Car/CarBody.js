class CarBody extends Object3D{
    /*Parte inferior del auto*/
    constructor(color){
        super();

        var SWEPT_LEVELS = 2;
        var SHAPE_POINTS = 12;

        this.shape = new CarBodyShape(SHAPE_POINTS);
        this.path = new StraightLine(SWEPT_LEVELS);

        this.surface = new SweptSurface(this.shape, this.path);

        this.setIndexCreator(new VertexGrid(SWEPT_LEVELS, SHAPE_POINTS));
        this.setPosCreator(this.surface);
        this.setNormalCreator(this.surface);
        if (!color) this.setColorCreator(new Gray(SWEPT_LEVELS, SHAPE_POINTS));
        else this.setColorCreator(color);
    }
}
