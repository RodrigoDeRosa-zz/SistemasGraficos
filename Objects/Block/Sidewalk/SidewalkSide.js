class SidewalkSide extends Object3D{
    /*Vereda de una manzana*/
    constructor(color, texture, id){
        super();

        var SWEPT_STEPS = 2;
        var SHAPE_POINTS = 56; //10 niveles por curva y 12 por las partes rectas

        this.shape = new SidewalkShape(SHAPE_POINTS);
        this.path = new StraightLine(SWEPT_STEPS);

        this.surface = new SweptSurface(this.shape, this.path);

        this.setIndexCreator(new VertexGrid(SWEPT_STEPS, SHAPE_POINTS));
        this.setPosCreator(this.surface);
        this.setNormalCreator(this.surface);
        this.setTangentCreator(this.surface);
        if (texture) {
            this.setTextureCreator(this);
            this.street = true;
            id ? this.id = id : this.id = 6;
        }else{
            if (!color) this.setColorCreator(new Gray(SWEPT_STEPS, SHAPE_POINTS));
            else this.setColorCreator(color);
        }
    }
    setTextureBuffer(){
        var buffer = [];
        var pathLevels = this.path.getLevels();
        var shapeLevels = this.shape.getLevels();
        var u, v;
        /*En cada nivel se calcula la componente v*/
        for (var i = 0; i < pathLevels; i++){
            v = (i / (pathLevels-1))*0.25; //Entre 0 y 1
            /*Para cada punto se calcula la componente u*/
            for (var j = 0; j < shapeLevels; j++){
                u = (j / (shapeLevels-1))*0.25; //Entre 0 y 1
                buffer.push(u);
                buffer.push(v);
            }
        }
        return buffer;
    }
}
