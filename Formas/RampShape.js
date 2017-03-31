class RampShape extends Shape{
    constructor(levels){
        super(levels, [false, false, false]);
        this.controlPoints = this.setControlPoints();
        this.curve = new QuadraticBezierPath(this.controlPoints);
        this.setPositions(); this.setNormals(); this.setTangents();
    }
    setControlPoints(){
        var buffer = [
            new Point(0, 0, 0),
            new Point(0.5, 0.1, 0),
            new Point(0.8, 1, 0),
            new Point(0.9, 1, 0),
            new Point(1, 1, 0),
            new Point(1, 0.5, 0),
            new Point(1, 0, 0)
        ];
        return buffer;
    }
    setPositions(){
        var deltaU = 3.0/this.levels;
        for (var u = 0.0; u < 3.0; u += deltaU){
            this.positions.push(this.curve.getPosition(u));
        }
    }
    setNormals(){
        var deltaU = 3.0/this.levels;
        for (var u = 0.0; u < 3.0; u += deltaU){
            this.normals.push(this.curve.getNormal(u));
        }
    }
    setTangents(){
        var deltaU = 3.0/this.levels;
        for (var u = 0.0; u < 3.0; u += deltaU){
            this.tangents.push(this.curve.getTangent(u));
        }
    }
}
