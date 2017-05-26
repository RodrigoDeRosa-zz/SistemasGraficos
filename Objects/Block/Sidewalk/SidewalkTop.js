class SidewalkTop extends Object3D{
    /**Parte de arriba de la vereda*/
    constructor(color, texture, id){
        super();

        this.setIndexCreator(new VertexGrid(2, 28));
        this.setPosCreator(this);
        this.setNormalCreator(this);
        if(texture){
            this.setTextureCreator(this);
            this.street = true;
            id ? this.id = id : this.id = 2.0;
        } else {
            if (!color) this.setColorCreator(new Gray(2, 28));
            else this.setColorCreator(color);
        }
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
            buffer.push(-1.0);
        }
        return buffer;
    }
    /**Calcula los u,v para cada tramo curvo
      * @param {xInit} float u y v iniciales
      * @param {xSense} int 1 o -1 depende si la variable aumenta o disminuye
    */
    getCurvePoints(uInit, vInit, uSense, vSense){
        var buffer = [];
        var u = uInit;
        var v = vInit;
        var inc = 0.025;
        for (var i = 0; i < 11; i++){
            if (i == 0){ u = u; v = v; } //En el primer paso uso los init
            else{
                u += uSense*inc;
                v += vSense*inc;
            }
            buffer.push(u);
            buffer.push(v);
        }
        return buffer;
    }
    setTextureBuffer(){
        var b0 = [
            //RECTA INFERIOR
            0.25, 0.0,
            0.5, 0.0,
            0.75, 0.0,
        ];
        //Se agrega la curva inferior derecha
        var b1 = this.getCurvePoints(0.75, 0.0, 1, 1);
        var b2 = [
            //RECTA DERECHA
            1.0, 0.25,
            1.0, 0.5,
            1.0, 0.75,
        ];
        //Se agrega la curva superior derecha
        var b3 = this.getCurvePoints(1.0, 0.75, -1, 1);
        var b4 = [
            //RECTA SUPERIOR
            0.75, 1.0,
            0.5, 1.0,
            0.25, 1.0,
        ];
        //Se agrega la curva superior izquierda
        var b5 = this.getCurvePoints(0.25, 1.0, -1, -1);
        var b6 = [
            //RECTA IZQUIERDA
            0.0, 0.75,
            0.0, 0.5,
            0.0, 0.25,
        ];
        //Se agrega la curva inferior izquierda
        var b7 = this.getCurvePoints(0.0, 0.25, 1, -1);
        var buffer = b0.concat(b1.concat(b2.concat(b3.concat(b4.concat(b5.concat(b6.concat(b7)))))));

        return buffer;
    }
}
