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
        if (texture) {
            this.setTextureCreator(this.surface);
            this.street = true;
            id ? this.id = id : this.id = 2.0;
        }else{
            if (!color) this.setColorCreator(new Gray(SWEPT_STEPS, SHAPE_POINTS));
            else this.setColorCreator(color);
        }

    }
}
