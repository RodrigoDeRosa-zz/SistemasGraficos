class Column extends Object3D{
    /*Columna para la autopista*/
    constructor(color){
        super();

        var REVOLT_LELELS = 20;
        var SHAPE_POINTS = 20; //10 niveles abajo, 4 en diagonal, y 3 de cada recta

        this.shape = new ColumnShape(SHAPE_POINTS);

        this.surface = new RevoltSurface(this.shape, REVOLT_LELELS, [0, 1, 0]);

        this.setIndexCreator(new VertexGrid(REVOLT_LELELS, SHAPE_POINTS));
        this.setPosCreator(this.surface);
        this.setNormalCreator(this.surface);
        if (!color) this.setColorCreator(new Gray(REVOLT_LELELS, SHAPE_POINTS));
        else this.setColorCreator(color);
    }
}
