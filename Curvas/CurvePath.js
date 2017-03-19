class CurvePath{
    /**Conjunto de curvas generico.Aqui los parametros pueden ser mayores a
      *1 y se considera que la parte decimal es u(sub i), siendo i el numero
      *de segmento de la curva (y estando representado por la parte entera.)
      * @param controlPoints: arreglo de puntos de clase Punto.
      * @param order: entero, orden de la curva.
    */
    constructor(controlPoints, order){
        this.segments = null;
        this.curve = null;
        this.setSegments(controlPoints, order);//SUBCLASS RESP.
    }
    /**Guarda en un arreglo todos los segmentos de curva que forman la curva
      *principal, separando a los puntos de control en nuevas curvas, todas
      *distintas, pero conectadas.
      * @param controlPoints: arreglo de puntos de clase Punto.
      * @param order: entero, orden de la curva.
    */
    setSegments(controlPoints, order){
        //TODO SUBCLASS
    }
    /**Devuelve el punto del segmento indicado representado por el parametro
      * recibido, en un tipo de curva dado.
      * @param u: float del tipo 'i.j', donde i es el numero de segmento y j es
      * el parametro en ese segmento.
    */
    _calculateParameter(u){
        var segment = Math.floor(Number(u));//Parte entera
        var parameter = u % 1; //Parte decimal
        if (segment >= this.segments.length){
            segment = segments.length-1;
            parameter = 0.99999999;
        }
        return [segment, parameter];
    }
    /**Devuelve la posicion para el parametro dado.
      * @param u: float del tipo 'i.j', donde i es el numero de segmento y j es
      * el parametro en ese segmento.
    */
    getPosition(u){
        var segPar = this._calculateParameter(u);
        return this.curve.getPosition(segPar[1], this.segments[segPar[0]]);
    }
    /**Devuelve la derivada en el parametro dado.
      * @param u: float del tipo 'i.j', donde i es el numero de segmento y j es
      * el parametro en ese segmento.
    */
    getTangent(u){
        var segPar = calculateParameter(u);
        return this.curve.getTangent(segPar[1], this.segments[segPar[0]]);
    }
    /**Devuelve la normal en el parametro dado.
      * @param u: float del tipo 'i.j', donde i es el numero de segmento y j es
      * el parametro en ese segmento.
    */
    getNormal(u){
        var segPar = calculateParameter(u);
        return this.curve.getNormal(segPar[1], this.segments[segPar[0]]);
    }
}
