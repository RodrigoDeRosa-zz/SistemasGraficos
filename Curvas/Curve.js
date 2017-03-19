class Curve{
    /*Curva de bezier principal, solo tiene metodos*/
    constructor(){
        this.basis = null;
        this.dBasis = null;
    }
    /*Devuelve la posicion del punto correspondiente al parametro u en los
    puntos de control dados. Dichos puntos de control son objetos del tipo
    Punto, es decir, se accede a sus coordenadas con '.x', '.y', '.z'.*/
    getPosition(u, controlPoints){
        var punto = new Punto(0, 0, 0);

        for (var i = 0; i < controlPoints.length; i++){
            punto.x += this.basis[i](u)*controlPoints[i].x;
            punto.y += this.basis[i](u)*controlPoints[i].y;
            punto.z += this.basis[i](u)*controlPoints[i].z;
        }
        return punto;
    }
    /*Idem getPosition pero con la tangente en dado U*/
    getTangent(u, controPoints){
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
        var tangent = this.getTangent(u, controPoints);
        var tanVec = vec3.fromValues(tangent.x, tangent.y, tangent.z);
        /*Vector del eje Y*/
        var auxVec = vec3.create();
        vec3.cross(auxVec, tanVec, vec3.fromValues(0, 1, 0));
        /*Se obtiene el vector normal como el producto vectorial entre la
        tangente y el eje Y (si la tangente es vertical no funciona)*/
        var normVec = vec3.create();
        vec3.cross(normVec, tanVec, auxVec);
        /*Se crea el punto a partir del vector obtenido*/
        var normal = new Point(normVec[0], normVec[1], normVec[2]);
        return normal;
    }
}
