class RoundRing extends Object3D{
    /**Cilindro 3D
      * @param {rows} integer Cantidad de bandas longitudinales
      * @param {cols} integer Cantidad de bandas latitudinales
      * @param {color} Color Objeto de clase Color.
    */
    constructor(rows, cols, color){
        super();

        this.rows = rows;
        this.cols = cols;
        /*El circulo no puede pasar por el origen! hace una esfera sino*/
        this.surface = new RevoltSurface(new Circle(cols), rows, vec3.fromValues(0, 1, 0));

        this.setIndexCreator(new VertexGrid(rows, cols));
        this.setPosCreator(this.surface);
        this.setNormalCreator(this.surface);
        if(!color) this.setColorCreator(new Gray(rows, cols));
        else this.setColorCreator(color);
    }
}
