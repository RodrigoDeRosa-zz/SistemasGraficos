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
            var sense;
            /*Se define el sentido y el offset*/
            (k > 5.0) ? k = 0 : false;
            if (i%2 == 0){
                sense = 1;
                offset = (1+k)*2.75;
            } else {
                sense = -1;
                offset = -(1+k)*2;
            }
            k++;
            /*Se define la curva*/
            var controlPoints = this.adaptPoints(curveController.controlPoints, offset);
            var curve = new QuadraticBSplinePath(controlPoints); //Curva para ese auto
            /*Se calculan las matrices de rotacion previamente, para no hacerlo a cada
            paso de la animacion*/
            var matrices = this.getCurveMatrices(curve);
            /*Se crea el auto y se lo agrega a la escena*/
            var car = new Car(shader);
            car.scale(0.1, 0.1, 0.1);
            scene.addChild(car);
            /*Se calcula la distancia al proximo auto de cada uno*/
            var verticalOffset = Math.random();
            /*Se obliga al numero a ser entero*/
            verticalOffset = Math.floor(verticalOffset*50) + 50;
            /*Se definen las variables del auto segun el sentido de circulacion*/
            /*IMPORTANTE: No guarda u, sino un numero entre 0 y 401 que representa el numero de matriz
            del nivel*/
            if (sense == -1) this.cars.push([car, curve, 0 + verticalOffset*i, sense, matrices]);
            else this.cars.push([car, curve, 2250 - verticalOffset*i, sense, matrices]);
        }
    }
    /**Calcula las matrices de transformacion de cada nivel para la curva dada
      * @return {map} Devuelve un diccionario con u como clave y la matriz como valor
    */
    getCurveMatrices(curve){
        var map = new Map();
        var i = 0;
        for (var u = 0.5; u <= 4.5; u += 0.00175){
            var matrix = mat4.create();
            mat4.identity(matrix);
            /*Se traslada a la posicion de la curva*/
            var pos = curve.getPosition(u);
            mat4.translate(matrix, matrix, vec3.fromValues(pos.x, pos.y, pos.z));
            /*Se rota en la direccion de la curva*/
            var tan = curve.getTangent(u);
            var norm = curve.getNormal(u);
            var vTan = vec3.fromValues(tan.x, tan.y, tan.z);
            var vNorm = vec3.fromValues(norm.x, norm.y, norm.z);
            vec3.normalize(vTan, vTan);
            vec3.normalize(vNorm, vNorm);
            var vBin = vec3.create();
            vec3.cross(vBin, vNorm, vTan);

            var rotMatrix = mat4.create();
            rotMatrix = [ vNorm[0], vNorm[1], vNorm[2], 0,
                           vBin[0],  vBin[1],  vBin[2], 0,
                           vTan[0],  vTan[1],  vTan[2], 0,
                                 0,        0,        0, 1];
            /*Se multiplica a derecha con la matriz de rotacion*/
            mat4.multiply(matrix, matrix, rotMatrix);
            /*Se guarda en el mapa la matriz para el u actual*/
            map.set(i, matrix);
            i++;
        }
        return map;
    }
    /*Actualiza la posicion de los autos en la autopista*/
    tick(){
        for (var i = 0; i < this.cars.length; i++){
            /*Se setea toda la informacion del auto*/
            var carInfo = this.cars[i];
            var car = carInfo[0];
            var curve = carInfo[1];
            var u = carInfo[2];
            var sense = carInfo[3];
            var matrices = carInfo[4];
            /*Se reseta la matriz y se aplican las transformaciones necesarias*/
            car.resetMatrix();
            car.translate(0, 0.309, 0);
            car.scale(0.05, 0.05, 0.05);
            /*Se aplica la matriz de transformacion del u actual*/
            car.applyMatrix(matrices.get(u));
            /*Si el auto va en sentido inverso, se rota*/
            if (sense == 1) car.rotate(Math.PI, 1, 0, 0);
            /*Rotacion necesaria*/
            car.rotate(Math.PI/2, 1, 0, 0);
            car.rotateWheels();
            /*Se aumenta o disminuye el u segun el sentido del recorrido*/
            if (sense == 1){
                carInfo[2]++;
                if (carInfo[2] > 2250) carInfo[2] = 0;
            }
            else{
                if (carInfo[2] - 1 < 0) carInfo[2] = 2250;
                else carInfo[2] -= 1;
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
