class LightBodyPath extends Path{
    /*Camino que debe barrer un circulo para formar el poste de una luminaria*/
    constructor(levels, rotate){
        super(levels, rotate);
    }
    setPositions(){
        var controlPoints = [
            new Point(0, 0.8, 0),
            new Point(0.5, 1, 0),
            new Point(0.8, 1, 0),
        ];
        this.positions.push(new Point(0, 0, 0));
        this.positions.push(new Point(0, 0.4, 0));
        this.positions.push(new Point(0, 0.8, 0));
        /*Son dos segmentos, uno recto y uno curvo*/
        var deltaU = 0.01;
        var curve = new QuadraticBezierPath(controlPoints);
        for (var u = 0.0; u < 1.0; u += deltaU){
            this.positions.push(curve.getPosition(u));
        }
    }
    setNormals(){
        var controlPoints = [
            new Point(0, 0.8, 0),
            new Point(0, 1, 0),
            new Point(0.4, 1, 0),
        ];
        this.normals.push(new Point(1, 0, 0));
        this.normals.push(new Point(1, 0, 0));
        this.normals.push(new Point(1, 0, 0));
        /*Son dos segmentos, uno recto y uno curvo*/
        var deltaU = 0.01;
        var curve = new QuadraticBezierPath(controlPoints);
        for (var u = 0.0; u < 1.0; u += deltaU){
            this.normals.push(curve.getNormal(u));
        }
    }
    setTangents(){
        var controlPoints = [
            new Point(0, 0.8, 0),
            new Point(0, 1, 0),
            new Point(0.4, 1, 0),
        ];
        this.tangents.push(new Point(0, 1, 0));
        this.tangents.push(new Point(0, 1, 0));
        this.tangents.push(new Point(0, 1, 0));
        /*Son dos segmentos, uno recto y uno curvo*/
        var deltaU = 0.01;
        var curve = new QuadraticBezierPath(controlPoints);
        for (var u = 0.0; u < 1.0; u += deltaU){
            this.tangents.push(curve.getTangent(u));
        }
    }
}
