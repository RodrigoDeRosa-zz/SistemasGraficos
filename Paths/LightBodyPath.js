class LightBodyPath extends Path{
    /*Camino que debe barrer un circulo para formar el poste de una luminaria*/
    constructor(levels){
        super(levels, true, [false, false, false]);
        this.controlPoints = this.setControlPoints();
        this.segments = 3.0;
        /*Shape methods*/
        this.setPositions(); this.setNormals(); this.setTangents();
        /*Path methods*/
        this.setBasisMatrices(); this.setVertexMatrices();
    }
    setControlPoints(){
        var buffer = [
            new Point(0, 0, 0),
            new Point(0.3, 0, 0),
            new Point(0.6, 0, 0),
            new Point(0.65, 0, 0),
            new Point(0.65, 0, 0.15),
            new Point(0.65, 0, 0.175),
            new Point(0.65, 0, 0.2)
        ]
        return buffer;
    }
    setPositions(){
        /*Son dos segmentos, uno recto y uno curvo*/
        var deltaU = 0.1;
        var curve = new QuadraticBezierPath(this.controlPoints);
        for (var u = 0.0; u < this.segments; u += deltaU){
            this.positions.push(curve.getPosition(u));
        }
    }
    setNormals(){
        /*Son dos segmentos, uno recto y uno curvo*/
        var deltaU = 0.1;
        var curve = new QuadraticBezierPath(this.controlPoints);
        for (var u = 0.0; u < this.segments; u += deltaU){
            this.normals.push(curve.getNormal(u));
        }
    }
    setTangents(){
        /*Son dos segmentos, uno recto y uno curvo*/
        var deltaU = 0.1;
        var curve = new QuadraticBezierPath(this.controlPoints);
        for (var u = 0.0; u < this.segments; u += deltaU){
            this.tangents.push(curve.getTangent(u));
        }
    }
}
