class Circle extends Shape{
    /**Circulo plano.
      * @param {levels} int Cantidad de niveles del circulo
    */
    constructor(levels){
        super(levels);
    }
    setPositions(){
        var theta = 2*Math.PI/(this.levels-1);
        for (var i = 0.0; i < this.levels; i++){
            /*Circulo apoyado sobre el plano XY*/
            var x = Math.cos(theta*i);
            var y = Math.sin(theta*i);
            var z = 0;
            var point = new Point(x, y, z);
            this.positions.push(point);
        }
    }
    setNormals(){
        var theta = 2*Math.PI/(this.levels-1);
        for (var i = 0.0; i < this.levels; i++){
            /*Circulo apoyado sobre el plano XY*/
            var x = Math.cos(theta*i);
            var y = Math.sin(theta*i);
            var z = 0;
            var point = new Point(x, y, z);
            this.normals.push(point);
        }
    }
    setTangents(){
        var theta = 2*Math.PI/(this.levels-1);
        for (var i = 0.0; i < this.levels; i++){
            /*Circulo apoyado sobre el plano XY*/
            var x = Math.sin(theta*i);
            var y = -Math.sin(theta*i);
            var z = 0;
            var point = new Point(x, y, z);
            this.tangents.push(point);
        }
    }
}
