class StraightLine extends Path{
    /**Linea recta sobre el eje Z.
      * @param {levels} int Cantidad de niveles del camino.
      * @param {rotate} bool Si se rotan o no los vertices a cada paso.
    */
    constructor(levels, rotate){
        super(levels, rotate);
    }
    setPositions(){
        for (var i = 0.0; i < this.levels; i++){
            var point = new Point(0, 0, -0.5 + i/(this.levels-1));
            this.positions.push(point);
        }
    }
    /*Normal en Y*/
    setNormals(){
        for (var i = 0.0; i < this.levels; i++){
            var point = new Point(0, 1, 0);
            this.normals.push(point);
        }
    }
    /*La tangente es la misma que la posicion por ser una linea recta*/
    setTangents(){
        for (var i = 0.0; i < this.levels; i++){
            var point = new Point(0, 0, 1);
            this.tangents.push(point);
        }
    }
}
