class LightBody extends Object3D{
    /*Poste de las luminarias*/
    constructor(color){
        super();

        var SHAPE_POINTS = 10;
        var SWEPT_STEPS = 14;

        this.shape = new Circle(SHAPE_POINTS, 0.01);
        this.path = new LightBodyPath(SWEPT_STEPS, true);

        this.surface = new SweptSurface(this.shape, this.path);

        this.setIndexCreator(new VertexGrid(SWEPT_STEPS, SHAPE_POINTS));
        this.setPosCreator(this.surface);
        this.setNormalCreator(this.surface);
        if (!color) this.setColorCreator(new Gray(SWEPT_STEPS, SHAPE_POINTS));
        else this.setColorCreator(color);
    }
}