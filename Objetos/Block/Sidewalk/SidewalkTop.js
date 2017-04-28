class SidewalkTop extends Object3D{
    /**Parte de arriba de la vereda*/
    constructor(){
        super();

        this.setIndexCreator(new VertexGrid(2, 28));
        this.setPosCreator(this);
        this.setNormalCreator(this);
        this.setColorCreator(new Gray(2, 28));
    }
    setPosBuffer(){
        var buffer = [];

        var bottomRight = [new Point(0.5, -0.75, 0), new Point(0.75, -0.75, 0), new Point(0.75, -0.5, 0)];
        var topRight = [new Point(0.75, 0.5, 0), new Point(0.75, 0.75, 0), new Point(0.5, 0.75, 0)];
        var topLeft = [new Point(-0.5, 0.75, 0), new Point(-0.75, 0.75, 0), new Point(-0.75, 0.5, 0)];
        var bottomLeft = [new Point(-0.75, -0.5, 0), new Point(-0.75, -0.75, 0), new Point(-0.5, -0.75, 0)];

        var down = [new Point(-0.5, -0.75, 0), new Point(0, -0.75, 0), new Point(0.5, -0.75, 0)];
        var right = [new Point(0.75, -0.5, 0), new Point(0.75, 0, 0), new Point(0.75, 0.5, 0)];
        var up = [new Point(0.5, 0.75, 0), new Point(0, 0.75, 0), new Point(-0.5, 0.75, 0)];
        var left = [new Point(-0.75, 0.5, 0), new Point(-0.75, 0, 0), new Point(-0.75, -0.5, 0)];

        this.addToBuffer(buffer, down);
        this.addCurvePositions(buffer, bottomRight);
        this.addToBuffer(buffer, right);
        this.addCurvePositions(buffer, topRight);
        this.addToBuffer(buffer, up);
        this.addCurvePositions(buffer, topLeft);
        this.addToBuffer(buffer, left);
        this.addCurvePositions(buffer, bottomLeft);

        return buffer;
    }
    /**Agrega a dest de a una las coordenadas de los 3 vertices recibidos en src.
      * @param {dest} array
      * @param {src} array Contiene 3 objetos de calse Point.
    */
    addToBuffer(dest, src){
        for (var i = 0; i < 3; i++){
            dest.push(src[i].x);
            dest.push(src[i].y);
            dest.push(src[i].z);
        }
    }
    /**Añade posiciones al buffer
      * @param {buffer} array Al que se le agregan los vertices.
      * @param {controlPoints} array Puntos de control de la curva
    */
    addCurvePositions(buffer, controlPoints){
        var curve = new QuadraticBezierPath(controlPoints);
        var deltaU = 0.1;
        for (var u = 0.0; u < 1.0; u += deltaU){
            var pos = curve.getPosition(u);
            buffer.push(pos.x);
            buffer.push(pos.y);
            buffer.push(pos.z);
        }
    }
    setNormalBuffer(){
        var buffer = [];
        for (var i = 0; i < 56; i++){
            buffer.push(0.0);
            buffer.push(0.0);
            buffer.push(1.0);
        }
        return buffer;
    }
}
