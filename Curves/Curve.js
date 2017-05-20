class Curve{
    /*Curva general*/
    constructor(){
        this.basis = null;
        this.dBasis = null;
    }
    /*Devuelve la posicion del punto correspondiente al parametro u en los
    puntos de control dados. Dichos puntos de control son objetos del tipo
    Punto, es decir, se accede a sus coordenadas con '.x', '.y', '.z'.*/
    getPosition(u, controlPoints){
        var punto = new Point(0, 0, 0);

        for (var i = 0; i < controlPoints.length; i++){
            punto.x += this.basis[i](u)*controlPoints[i].x;
            punto.y += this.basis[i](u)*controlPoints[i].y;
            punto.z += this.basis[i](u)*controlPoints[i].z;
        }
        return punto;
    }
    /*Idem getPosition pero con la tangente en dado U*/
    getTangent(u, controlPoints){
        var tangent = new Point(0, 0, 0);

        for (var i = 0; i < controlPoints.length; i++){
            tangent.x += this.dBasis[i](u)*controlPoints[i].x;
            tangent.y += this.dBasis[i](u)*controlPoints[i].y;
            tangent.z += this.dBasis[i](u)*controlPoints[i].z;
        }
        return tangent;
    }
    /*Idem con la normal*/
    getNormal(u, controlPoints){
        /*Se obtiene la tangente en el punto*/
        var tangent = this.getTangent(u, controlPoints);
        var tanVec = vec3.fromValues(tangent.x, tangent.y, tangent.z);
        /*Se normaliza la tangente*/
        var nTan = vec3.create();
        vec3.normalize(nTan, tanVec);
        /*Vector del eje Y (o X si esta en el eje Y la curva)*/
        var auxVec = vec3.create();
        var multiplyVec = vec3.fromValues(0, -1, 0);
        if (tangent.x == 0 && tangent.z == 0) multiplyVec = vec3.fromValues(-1, 0, 0);
        vec3.cross(auxVec, nTan, multiplyVec);
        /*Se obtiene el vector normal como el producto vectorial entre la
        tangente y el eje Y (si la tangente es vertical no funciona)*/
        var normVec = vec3.create();
        vec3.cross(normVec, tanVec, auxVec);
        /*Se crea el punto a partir del vector obtenido*/
        var normal = new Point(normVec[0], normVec[1], normVec[2]);
        return normal;
    }
}
