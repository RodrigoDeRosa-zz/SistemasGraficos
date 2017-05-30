class Concrete extends Object3D{
    /*Concreto del camino (parte inferior)*/
    constructor(){
        super();

        var SWEPT_LEVELS = 70;
        var SHAPE_POINTS = 32;
        this.rows = SWEPT_LEVELS;
        this.cols = SHAPE_POINTS;

        this.shape = new ConcreteShape(SHAPE_POINTS);
        this.path = new RoadPath(curveController.controlPoints ,SWEPT_LEVELS);

        this.surface = new SweptSurface(this.shape, this.path);

        this.setIndexCreator(new VertexGrid(SWEPT_LEVELS, SHAPE_POINTS));
        this.setTextureCreator(this);
        this.setPosCreator(this.surface);
        this.setNormalCreator(this.surface);
        this.street = true;
        this.id = 4.0;
    }
    setTextureBuffer(){
        var buffer = [];
        var pathLevels = this.path.getLevels();
        var shapeLevels = this.shape.getLevels();
        var u, v;
        /*En cada nivel se calcula la componente v*/
        for (var i = 0; i < pathLevels; i++){
            v = (i / (pathLevels-1))*10; //Entre 0 y 5
            /*Para cada punto se calcula la componente u*/
            for (var j = 0; j < shapeLevels; j++){
                u = (j / (shapeLevels-1))*6; //Entre 0 y 2
                buffer.push(u);
                buffer.push(v);
            }
        }
        return buffer;
    }
}
