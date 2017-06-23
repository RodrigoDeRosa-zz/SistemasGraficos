class LightBody extends Object3D{
    /*Poste de las luminarias*/
    constructor(){
        super();

        var SHAPE_POINTS = 6;
        var SWEPT_STEPS = 30;

        this.shape = new Circle(SHAPE_POINTS, 0.01);
        this.path = new LightBodyPath(SWEPT_STEPS);

        this.surface = new SweptSurface(this.shape, this.path);

        this.setIndexCreator(new VertexGrid(SWEPT_STEPS, SHAPE_POINTS));
        this.setPosCreator(this.surface);
        this.setNormalCreator(this.surface);
        this.setTangentCreator(this.surface);
        this.setTextureCreator(this);
        this.street = true;
        this.id = 4;
    }
    setTextureBuffer(){
        var buffer = [];
        var pathLevels = this.path.getLevels();
        var shapeLevels = this.shape.getLevels();
        var u, v;
        /*En cada nivel se calcula la componente v*/
        for (var i = 0; i < pathLevels; i++){
            v = (i / (pathLevels-1))*8; //Entre 0 y 4
            /*Para cada punto se calcula la componente u*/
            for (var j = 0; j < shapeLevels; j++){
                u = j / (shapeLevels-1); //Entre 0 y 1
                buffer.push(u);
                buffer.push(v);
            }
        }
        return buffer;
    }
}
