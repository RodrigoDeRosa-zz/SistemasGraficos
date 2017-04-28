class SidewalkShape extends Shape{
    /**Forma de la vereda,
      * @param {shapePoints} integer Cantidad de vertices de la forma
    */
    constructor(shapePoints){
        super(shapePoints, [false, false, false]);
        /*Puntos de control de las curvas*/
        this.bottomRight = [new Point(0.5, -0.75, 0), new Point(0.75, -0.75, 0), new Point(0.75, -0.5, 0)];
        this.topRight = [new Point(0.75, 0.5, 0), new Point(0.75, 0.75, 0), new Point(0.5, 0.75, 0)];
        this.topLeft = [new Point(-0.5, 0.75, 0), new Point(-0.75, 0.75, 0), new Point(-0.75, 0.5, 0)];
        this.bottomLeft = [new Point(-0.75, -0.5, 0), new Point(-0.75, -0.75, 0), new Point(-0.5, -0.75, 0)];

        this.setPositions(); this.setNormals(); this.setTangents();
    }
    setPositions(){
        var down = [new Point(-0.5, -0.75, 0), new Point(0, -0.75, 0), new Point(0.5, -0.75, 0)];
        var right = [new Point(0.75, -0.5, 0), new Point(0.75, 0, 0), new Point(0.75, 0.5, 0)];
        var up = [new Point(0.5, 0.75, 0), new Point(0, 0.75, 0), new Point(-0.5, 0.75, 0)];
        var left = [new Point(-0.75, 0.5, 0), new Point(-0.75, 0, 0), new Point(-0.75, -0.5, 0)];

        this.addToBuffer(this.positions, down);
        this.addCurvePositions(this.bottomRight);
        this.addToBuffer(this.positions, right);
        this.addCurvePositions(this.topRight);
        this.addToBuffer(this.positions, up);
        this.addCurvePositions(this.topLeft);
        this.addToBuffer(this.positions, left);
        this.addCurvePositions(this.bottomLeft);
    }
    /**Agrega a dest de a una las coordenadas de los 3 vertices recibidos en src.
      * @param {dest} array
      * @param {src} array Contiene 3 objetos de calse Point.
    */
    addToBuffer(dest, src){
        for (var i = 0; i < 3; i++){
            dest.push(src[i]);
        }
    }
    /**Añade posiciones al buffer.
      * @param {controlPoints} array Puntos de control de la curva
    */
    addCurvePositions(controlPoints){
        var curve = new QuadraticBezierPath(controlPoints);
        var deltaU = 0.1;
        for (var u = 0.0; u < 1.0; u += deltaU){
            this.positions.push(curve.getPosition(u));
        }
    }
    setNormals(){
        var down = [new Point(0, -1, 0), new Point(0, -1, 0), new Point(0, -1, 0)];
        var right = [new Point(1, 0, 0), new Point(1, 0, 0), new Point(1, 0, 0)];
        var up = [new Point(0, 1, 0), new Point(0, 1, 0), new Point(0, 1, 0)];
        var left = [new Point(-1, 0, 0), new Point(-1, 0, 0), new Point(-1, 0, 0)];

        this.addToBuffer(this.normals, down);
        this.addCurveNormals(this.bottomRight, -1);
        this.addToBuffer(this.normals, right);
        this.addCurveNormals(this.topRight);
        this.addToBuffer(this.normals, up);
        this.addCurveNormals(this.topLeft);
        this.addToBuffer(this.normals, left);
        this.addCurveNormals(this.bottomLeft, -1);
    }
    /**Añade normales al buffer.
      * @param {controlPoints} array Puntos de control de la curva
    */
    addCurveNormals(controlPoints, m){
        var curve = new QuadraticBezierPath(controlPoints);
        var deltaU = 0.1;
        for (var u = 0.0; u < 1.0; u += deltaU){
            if(m){
                var pos = curve.getNormal(u);
                this.normals.push(new Point(m*pos.x, m*pos.y, m*pos.z));
            } else this.normals.push(curve.getNormal(u));
        }
    }
    setTangents(){
        var down = [new Point(1, 0, 0), new Point(1, 0, 0), new Point(1, 0, 0)];
        var right = [new Point(0, 1, 0), new Point(0, 1, 0), new Point(0, 1, 0)];
        var up = [new Point(-1, 0, 0), new Point(-1, 0, 0), new Point(-1, 0, 0)];
        var left = [new Point(0, -1, 0), new Point(0, -1, 0), new Point(0, -1, 0)];

        this.addToBuffer(this.tangents, down);
        this.addCurveTangents(this.bottomRight);
        this.addToBuffer(this.tangents, right);
        this.addCurveTangents(this.topRight);
        this.addToBuffer(this.tangents, up);
        this.addCurveTangents(this.topLeft);
        this.addToBuffer(this.tangents, left);
        this.addCurveTangents(this.bottomLeft);
    }
    /**Añade normales al buffer.
      * @param {controlPoints} array Puntos de control de la curva
    */
    addCurveTangents(controlPoints){
        var curve = new QuadraticBezierPath(controlPoints);
        var deltaU = 0.1;
        for (var u = 0.0; u < 1.0; u += deltaU){
            this.tangents.push(curve.getTangent(u));
        }
    }
}
