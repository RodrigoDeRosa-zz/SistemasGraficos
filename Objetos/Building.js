class Building extends Object3D{
    /**Edificio individual.
     * @param {type} integer Tipo de edifico a crear (Edificio 1, 2, etc..)
     * @param {color} Color Objeto de clase Color
    */
    constructor(type, color){
        super();

        var SWEPT_STEPS = 3;
        var SHAPE_POINTS = 8; //Un cuadrado con los extremos repetidos para facetado

        this.shape = new BuildingShape(type);
        this.path =  new StraightLine(SWEPT_STEPS);

        this.surface = new SweptSurface(this.shape, this.path);

        this.setIndexCreator(new VertexGrid(SHAPE_POINTS, SWEPT_STEPS));
        this.setPosCreator(this.surface);
        this.setNormalCreator(this.surface);
        if (!color) this.setColorCreator(new Gray(SHAPE_POINTS, SWEPT_STEPS));
        else this.setColorCreator(color);
    }
}
