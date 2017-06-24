class Highway extends Container3D{
    /*Autopista*/
    constructor(shader){
        super();
        this.setShaderProgram(shader);

        var road = new Road(shader);
        road.translate(0, 0.295, -0.2);
        road.rotate(Math.PI/2, 0, 1, 0);
        road.rotate(Math.PI/2, 0, 0, 1);
        road.scale(0.25, 0.25, 0.25);
        this.addChild(road);

        var controlPoints = this.adaptPoints(curveController.controlPoints);
        this.curve = new QuadraticBSplinePath(controlPoints);
        this.addColumns(shader);
        this.addLights(shader);
    }
    /*Agrega las columnas de la autopista dependiendo de la curva*/
    addColumns(shader){
        for (var i = 1; i < 4.5; i += 0.5){
            var column = new Column();
            column.setShaderProgram(shader);
            column.build();
            column.scale(0.25, 0.3, 0.25);

            var pos = this.curve.getPosition(i);

            column.translate(pos.x, pos.y, pos.z);
            this.addChild(column);
        }
    }
    /*Agrega las luces de la autopista dependiendo de la curva*/
    addLights(shader){
        var k = 0;
        for (var i = 0.5; i < 4.5; i += 0.175){
            var light = new Light(shader);
            light.scale(0.25, 0.25, 0.25);
            /*Se traslada a la posicion de la curva*/
            var pos = this.curve.getPosition(i);
            light.translate(pos.x, pos.y + 1.2, pos.z);
            /*Una luz mira para cada lado*/
            if (k%2 == 0) light.rotate(Math.PI, 0, 1, 0);
            /*Se rota en la direccion de la curva*/
            var tan = this.curve.getTangent(i);
            var norm = this.curve.getNormal(i);
            var vTan = vec3.fromValues(tan.x, tan.y, tan.z);
            var vNorm = vec3.fromValues(norm.x, norm.y, norm.z);
            vec3.normalize(vTan, vTan);
            vec3.normalize(vNorm, vNorm);
            var vBin = vec3.create();
            vec3.cross(vBin, vNorm, vTan);

            var matrix = mat4.create();
            matrix = [ vNorm[0], vNorm[1], vNorm[2], 0,
                        vBin[0],  vBin[1],  vBin[2], 0,
                        vTan[0],  vTan[1],  vTan[2], 0,
                              0,        0,        0, 1];
            light.applyMatrix(matrix);
            light.rotate(-Math.PI/2, 0, 0, 1);
            this.addChild(light);
            if (k < 23){
                var dir;
                (k%2 == 0) ? dir = -1 : dir = 1;
                var spotMatrix = mat4.create();
                mat4.scale(spotMatrix, spotMatrix, vec3.fromValues(60, 60, 60));
                mat4.scale(spotMatrix, spotMatrix, vec3.fromValues(0.25, 0.4, 0.25));
                mat4.translate(spotMatrix, spotMatrix, vec3.fromValues(pos.x, pos.y+1.2, pos.z+dir*0.3));
                if (k%2 == 0) mat4.rotate(spotMatrix, spotMatrix, Math.PI, vec3.fromValues(0, 1, 0));
                mat4.multiply(spotMatrix, spotMatrix, matrix);
                mat4.rotate(spotMatrix, spotMatrix, -Math.PI/2, vec3.fromValues(0, 0, 1));
                //Posicion de cada spot
                var spotPos = [0, 0, 0];
                vec3.transformMat4(spotPos, spotPos, spotMatrix);
                for (var j = 0; j < 3; j++){
                    spotLightPos.push(spotPos[j]);
                }
            }
            k++;
        }
    }
    /*Adapta los puntos de control del canvas al mundo*/
    adaptPoints(control){
        var buffer = [];
        /*Se pasa al plano XZ*/
        for (var i = 0; i < 7; i++){ //La curva tiene siempre 7 puntos de control
            var point = new Point((control[i].x - 200)/15, 0, (control[i].y - 212)/15);
            buffer.push(point);
        }
        return buffer;
    }
}
