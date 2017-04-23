class BSplinePath extends CurvePath{
    /**Conjunto de curvas BSpline.
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
        var amountSegments = length-order;
        for (var i = 0; i < amountSegments; i++){
            var segment = [];
            for (var j = 0; j < order+1; j++){
                //Agrega [0,1,2], despues [1,2,3], etc.
                segment.push(controlPoints[j + i]);
            }
            segments.push(segment);
        }
        this.segments = segments;
    }
}
class LinearBSplinePath extends BSplinePath{
    /**@param {controlPoints} array Arreglo de puntos de clase Punto.*/
    constructor(controlPoints){
        super(controlPoints, 1);
        this.curve = new LinearBSpline();
    }
}
class QuadraticBSplinePath extends BSplinePath{
    /**@param {controlPoints} array Arreglo de puntos de clase Punto.*/
    constructor(controlPoints){
        super(controlPoints, 2);
        this.curve = new QuadraticBSpline();
    }
}
class CubicBSplinePath extends BSplinePath{
    /**@param {controlPoints} array Arreglo de puntos de clase Punto.*/
    constructor(controlPoints){
        super(controlPoints, 3);
        this.curve = new CubicBSpline();
    }
}
