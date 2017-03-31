class Ramp extends Object3D{
    /**Rampa hecha con curvas de bezier.
      * @param {rows} integer Niveles de la forma
      * @param {cols} integer Niveles del barrido
      * @param {color} Color Objeto de clase Color.
    */
    constructor(rows, cols, color){
        super();

        this.rows = rows;
        this.cols = cols;

        var shape = new RampShape(cols);
        var path = new StraightLine(rows);

        this.surface = new SweptSurface(shape, path);

        this.setIndexCreator(new VertexGrid(rows, cols));
        this.setPosCreator(this.surface);
        this.setNormalCreator(this.surface);
        if(!color) this.setColorCreator(new Gray(rows, cols));
        else this.setColorCreator(color);
    }
}
