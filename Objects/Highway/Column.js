class Column extends Object3D{
    /*Columna para la autopista*/
    constructor(){
        super();

        var REVOLT_LEVELS = 20;
        var SHAPE_POINTS = 20; //10 niveles abajo, 4 en diagonal, y 3 de cada recta

        this.shape = new ColumnShape(SHAPE_POINTS);

        this.surface = new RevoltSurface(this.shape, REVOLT_LEVELS, [0, 1, 0]);

        this.setIndexCreator(new VertexGrid(REVOLT_LEVELS, SHAPE_POINTS));
        this.setPosCreator(this.surface);
        this.setNormalCreator(this.surface);
        this.setTextureCreator(this);
        this.street = true;
        this.id = 4.0;
    }
    setTextureBuffer(){
        var buffer = [];
        var shapeLevels = this.shape.getLevels();
        var u, v;
        /*En cada nivel se calcula la componente v*/
        for (var i = 0; i < 20; i++){
            v = (i / (20-1))*3.0; //Entre 0 y 5
            /*Para cada punto se calcula la componente u*/
            for (var j = 0; j < shapeLevels; j++){
                if (j == 10) u = 0;
                else if (j == 11) u = 0.5;
                else if (j == 12) u = 1;
                else u = (j / (shapeLevels-1))*2; //Entre 0 y 3
                buffer.push(u);
                buffer.push(v);
            }
        }
        return buffer;
    }
}
