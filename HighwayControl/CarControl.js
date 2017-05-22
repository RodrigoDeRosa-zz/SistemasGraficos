class CarControl{
    /**Clase que se encarga de ubicar y mover los autos
      * @param {cars} integer Cantidad de autos
    */
    constructor(cars, shader){
        this.cars = []; //Lista de listas [[auto, curva, u, sentido]]
        this.setCarsInfo(cars, shader);
    }
    setCarsInfo(n, shader){
        var k = 0;
        for (var i = 0.0; i < n; i++){
            var offset;
            (k > 5.0) ? k = 0 : false;
            if (i%2 == 0){
                sense = 1;
                offset = (1+k)*2.5;
            } else {
                sense = -1;
                offset = -(1+k)*2;
            }
            k++;
            var controlPoints = this.adaptPoints(curveController.controlPoints, offset);
            var curve = new QuadraticBSplinePath(controlPoints); //Curva para ese auto
            var car = new Car(shader);
            var sense;
            car.scale(0.1, 0.1, 0.1);
            scene.addChild(car);
            var verticalOffset = Math.random();
            (verticalOffset > 0.3) ? verticalOffset = 0.3 : false;
            if (sense == -1) this.cars.push([car, curve, 0.5 + verticalOffset*i, sense]);
            else this.cars.push([car, curve, 4.5 - verticalOffset*i, sense]);
        }
    }
    /*Actualiza la posicion de los autos en la autopista*/
    tick(){
        for (var i = 0; i < this.cars.length; i++){
            var carInfo = this.cars[i];
            var car = carInfo[0];
            var curve = carInfo[1];
            var u = carInfo[2];
            var sense = carInfo[3];
            car.resetMatrix();
            car.translate(0, 0.315, 0);
            car.scale(0.05, 0.05, 0.05);
            /*Se traslada a la posicion de la curva*/
            var pos = curve.getPosition(u);
            car.translate(pos.x, pos.y, pos.z);
            /*Se rota en la direccion de la curva*/
            var tan = curve.getTangent(u);
            var norm = curve.getNormal(u);
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
            car.applyMatrix(matrix);
            if (sense == -1) car.rotate(Math.PI, 1, 0, 0);
            car.rotate(Math.PI/2, 1, 0, 0);
            if (sense == 1){
                carInfo[2] += 0.01;
                if (carInfo[2] > 4.5) carInfo[2] = 0.5
            }
            else{
                if (carInfo[2] - 0.05 < 0.5) carInfo[2] = 4.5;
                else carInfo[2] -= 0.01;
            }
        }
    }
    /**Adapta los puntos de control del canvas al mundo
      * @param {offset} float desplazamiento sobre el ancho la autopista de cada auto
    */
    adaptPoints(control, offset){
        var buffer = [];
        /*Se pasa al plano XZ*/
        for (var i = 0; i < 7; i++){ //La curva tiene siempre 7 puntos de control
            var point = new Point((control[i].x - 200)/3, 0, (control[i].y - 212 + offset)/3);
            buffer.push(point);
        }
        return buffer;
    }
}
