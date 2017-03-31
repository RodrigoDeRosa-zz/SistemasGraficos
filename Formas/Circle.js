class Circle extends Shape{
    /**Circulo plano.
      * @param {levels} int Cantidad de niveles del circulo
      * @param {radius} float Radio del circulo (opcional)
      * @param {offset} float Corrimiento en el eje x desde el centro (opcional)
    */
    constructor(levels, radius, offset){
        var setterList = [false, true, true];
        super(levels, setterList);
        offset ? this.offset = offset : this.offset = 0;
        radius ? this.radius = radius : this.radius = 1;
        this.setPositions();
    }
    setPositions(){
        /*Circulo apoyado sobre el plano XY*/
        var theta = 2*Math.PI/(this.levels-1);
        for (var i = 0.0; i < this.levels; i++){
            var x = this.radius*Math.cos(theta*i) + this.offset;
            var y = this.radius*Math.sin(theta*i);
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
            var y = -Math.cos(theta*i);
            var z = 0;
            var point = new Point(x, y, z);
            this.tangents.push(point);
        }
    }
}
