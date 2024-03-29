class BezierPath extends CurvePath{
    /**Conjunto de curvas de Bezier.
      * @param {controlPoints} array Arreglo de puntos de clase Punto.
      * @param {order} integer Orden de la curva.
    */
    constructor(controlPoints, order){
        super(controlPoints, order);
    }
    /**Guarda en un arreglo todos los segmentos de curva que forman la curva
      *principal, separando a los puntos de control en nuevas curvas, todas
      *distintas, pero conectadas.
      * @param {controlPoints} array Arreglo de puntos de clase Punto.
      * @param {order} integer Orden de la curva.
    */
    setSegments(controlPoints, order){
        var segments = [];
        var length = controlPoints.length;
        var amountSegments = (length-1)/order;
        for (var i = 0; i < amountSegments; i++){
            var segment = [];
            for (var j = 0; j < order+1; j++){
                //Agrega [0,1,2], despues [2,3,4], etc.
                segment.push(controlPoints[j + i*order]);
            }
            segments.push(segment);
        }
        this.segments = segments;
    }
}
class LinearBezierPath extends BezierPath{
    /**@param {controlPoints} array Arreglo de puntos de clase Punto.*/
    constructor(controlPoints){
        super(controlPoints, 1);
        this.curve = new LinearBezier();
    }
}
class QuadraticBezierPath extends BezierPath{
    /**@param {controlPoints} array Arreglo de puntos de clase Punto.*/
    constructor(controlPoints){
        super(controlPoints, 2);
        this.curve = new QuadraticBezier();
    }
}
class CubicBezierPath extends BezierPath{
    /**@param {controlPoints} array Arreglo de puntos de clase Punto.*/
    constructor(controlPoints){
        super(controlPoints, 3);
        this.curve = new CubicBezier();
    }
}
