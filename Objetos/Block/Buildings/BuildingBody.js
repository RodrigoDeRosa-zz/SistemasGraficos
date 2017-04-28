class BuildingBody extends Object3D{
    /**Edificio default ([x,y,z]=[1,1,1]).
     * @param {color} Color Objeto de clase Color
    */
    constructor(color){
        super();

        var SWEPT_STEPS = 2;
        var SHAPE_POINTS = 8; //Un cuadrado con los extremos repetidos para facetado

        this.shape = new BuildingShape();
        this.path = new StraightLine(SWEPT_STEPS);

        this.surface = new SweptSurface(this.shape, this.path);

        this.setIndexCreator(new VertexGrid(SWEPT_STEPS, SHAPE_POINTS));
        this.setPosCreator(this.surface);
        this.setNormalCreator(this.surface);
        if (!color) this.setColorCreator(new Orange(SWEPT_STEPS, SHAPE_POINTS));
        else this.setColorCreator(color);
    }
}
