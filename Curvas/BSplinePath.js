class BSplinePath extends CurvePath{
    /*Conjunto de curvas de BSpline.*/
    constructor(controlPoints, order){
        super(controlPoints, order);
    }
    /*Guarda en un arreglo todos los segmentos de curva que forman la curva
    principal, separando a los puntos de control en nuevas curvas, todas
    distintas, pero conectadas.*/
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
        this.segments = segment;
    }
}
class LinearBSplinePath extends BSplinePath{
    constructor(controlPoints){
        super(controlPoints, 1);
        this.curve = new LinearBSpline();
    }
}
class QuadraticBSplinePath extends BSplinePath{
    constructor(controlPoints){
        super(controlPoints, 2);
        this.curve = new QuadraticBSpline();
    }
}
class CubicBSplinePath extends BSplinePath{
    constructor(controlPoints){
        super(controlPoints, 3);
        this.curve = new CubicBSpline();
    }
}
