class RoadPath extends Path{
    /*Camino de la autopista*/
    constructor(controlPoints, levels, rotate){
        super(levels, true, [false, false, false]);
        this.controlPoints = this.adaptPoints(controlPoints);
        this.curve = new QuadraticBSplinePath(this.controlPoints);
        this.points = 7.0;
        /*Shape methods*/
        this.setPositions(); this.setNormals(); this.setTangents();
        /*Path methods*/
        this.setBasisMatrices(); this.setVertexMatrices();
    }
    setPositions(){
        var deltaU = 0.1;
        for (var u = 0.0; u < this.points; u += deltaU){
            this.positions.push(this.curve.getPosition(u));
        }
    }
    setNormals(){
        var deltaU = 0.1;
        for (var u = 0.0; u < this.points; u += deltaU){
            this.normals.push(this.curve.getNormal(u));
        }
    }
    setTangents(){
        var deltaU = 0.1;
        for (var u = 0.0; u < this.points; u += deltaU){
            this.tangents.push(this.curve.getTangent(u));
        }
    }
    /*Adapta los puntos del canvas de la curva al mundo (0,1)*/
    adaptPoints(control){
        var buffer = [];
        /*Se pasa al plano XZ*/
        for (var i = 0; i < 7; i++){ //La curva tiene siempre 7 puntos de control
            var point = new Point(0, (control[i].y - 200)/15, (control[i].x - 200)/15);
            buffer.push(point);
        }
        return buffer;
    }
}
