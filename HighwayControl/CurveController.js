class CurveController{
    /*Controlador del canvas de la creacion de autopista*/
    constructor(){
        this.controlPoints = this.setControlPoints();
        this.curve = new QuadraticBSplinePath(this.controlPoints);
        this.ctx = curveCanvas.getContext("2d");
        this.index;
        this.blockType = [];
        this.setBlocks();
        this.animate();
    }
    /*Define los puntos de control inciales de la curva*/
    setControlPoints(){
        var p0 = new Point(-10, 120, 0);
        var p1 = new Point(160, 120, 0);
        var p2 = new Point(240, 240, 0);
        var p3 = new Point(320, 200, 0);
        var p4 = new Point(410, 200, 0);

        return [ p0, p0, p1, p2, p3, p4, p4 ];
    }
    /*Desplaza el punto de control clickeado*/
    initDragging(e){
        var pos = $("#curveCanvas").position();
        if (!onDrag) this.index = this.getControlPointIndex(pos, e);
        if (this.checkIndex()){
            onDrag = true;
            this.controlPoints[this.index].x = e.pageX - pos.left;
            this.controlPoints[this.index].y = e.pageY - pos.top;
        }
    }
    /*Se fija se se clickeo algun punto de control y devuelve el indice*/
    getControlPointIndex(pos, e){
        var x = e.pageX - pos.left;
        var y = e.pageY - pos.top;
        for (var i = 0; i < this.controlPoints.length; i++){
            var pointX = this.controlPoints[i].x;
            if (pointX < x+8 && pointX > x-8){
                var pointY = this.controlPoints[i].y;
                if (pointY < y+8 && pointY > y-8){
                    return i;
                }
            }
        }
        return null;
    }
    /*Verifica si el punto de control clickeado se puede mover o no*/
    checkIndex(index){
        if (!this.index) return false;
        if (this.index < 2 || this.index > this.controlPoints.length-3) return false;
        return true;
    }
    /*Dibuja la curva generada por los puntos de control*/
    drawCurve(){
        this.ctx.lineWidth=20;
        var deltaU=0.01;
        this.ctx.beginPath();

        /*Primero se calcula que manzanas son parque y que manzanas son edificio*/
        for (var u = 0; u <= ((this.controlPoints.length-2) + 0.001); u += deltaU){
            // Tengo que calcular la posicion del punto c(u)
            var punto = this.curve.getPosition(u);
            this.updateBlocks(punto.x, punto.y);
        }
        this.fillBlocks();
        /*Ahora se dibuja la curva. Es poco eficiente pero es lo que mejor queda*/
        for (var u = 0; u <= ((this.controlPoints.length-2) + 0.001); u += deltaU){
            // Tengo que calcular la posicion del punto c(u)
            var punto = this.curve.getPosition(u);

            if (u==0) this.ctx.moveTo(punto.x, punto.y);
            this.ctx.lineTo(punto.x, punto.y);// hago una linea desde el ultimo lineTo hasta x,y
        }
        this.ctx.strokeStyle="#000000";
        this.ctx.stroke();

        // Dibujo el grafo de control, solo para verificar donde esta cada punto de control
        this.ctx.lineWidth = 0.8;
        this.ctx.beginPath();
        this.ctx.moveTo(this.controlPoints[0].x, this.controlPoints[0].y);
        for (var i = 1; i < this.controlPoints.length; i++){
            this.ctx.lineTo(this.controlPoints[i].x, this.controlPoints[i].y);
        }
        this.ctx.strokeStyle="#0000FF";
        this.ctx.stroke();

        for (var i = 0; i < this.controlPoints.length; i++){
            this.ctx.lineWidth = 2;
            this.ctx.beginPath();
            this.ctx.arc(this.controlPoints[i].x, this.controlPoints[i].y, 5, 0, 2*Math.PI);
            if (i == this.index && onDrag) this.ctx.strokeStyle = "#00FFFF";
            else this.ctx.strokeStyle="#0000FF";
            this.ctx.stroke();
        }
    }
    /*Recibe los x,y de un punto de la curva y pinta la manzana donde esta de verde.*/
    updateBlocks(x, y){
        this.ctx.fillStyle = "#00CC00";
        /*Mitad hacia abajo*/
        var z = Math.floor((y+9.5)/80.0);
        var nX = Math.floor((x+9.5)/80.0);
        this.blockType[z][nX] = BLOCK_PARK;
        this.ctx.fillRect(0+nX*80, 0+z*80, 80, 80);
        /*Mitad hacia arriba*/
        z = Math.floor((y-10)/80.0);
        nX = Math.floor((x-10)/80.0);
        this.blockType[z][nX] = BLOCK_PARK;
        this.ctx.fillRect(0+nX*80, 0+z*80, 80, 80);
    }
    /*Pinta las manzanas de edificios*/
    fillBlocks(){
        for (var i = 0; i < 5; i++){
            for (var j = 0; j < 5; j++){
                if (this.blockType[i][j] == BLOCK_BUILDING){
                    this.ctx.fillStyle = "#DD8000";
                    this.ctx.fillRect(0+j*80, 0+i*80, 80, 80);
                }
            }
        }
    }
    resetBlocks(){
        for (var i = 0; i < 5; i++){
            for (var j = 0; j < 5; j++){
                this.blockType[i][j] = BLOCK_BUILDING;
            }
        }
    }
    /*Pinta los cuadrados que representan las manzanas y crea la matriz que se usa para
    la creacion de la ciudad.*/
    setBlocks(){
        var x, z;
        for (var i = -2; i <= 2; i++){
            this.blockType.push([]);
            z = i + 2;
            for (var j = -2; j <= 2; j++){
                x = j + 2;
                this.blockType[z].push(BLOCK_BUILDING);
            }
        }
    }
    /*Maneja el dibujado de la curva y el movimiento de los puntos de control*/
    animate(){
        this.ctx.clearRect ( 0 , 0 , 400 , 400 );
        this.resetBlocks();
        this.drawCurve();
    }
}
