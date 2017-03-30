class StraightLine extends Path{
    /**Linea recta sobre el eje Z. No es sobre el Y por la forma en la que
      *se calculan las normales. (NO PUEDE SER VERTICAL EN NINGUN PUNTO)
      * @param {levels} int Cantidad de niveles del camino.
    */
    constructor(levels){
        super(levels);
    }
    setPositions(){
        for (var i = 0.0; i < this.levels; i++){
            var point = new Point(0, 0, 1/(1-i));
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
