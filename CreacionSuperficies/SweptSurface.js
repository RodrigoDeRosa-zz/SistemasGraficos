class SweptSurface{
    /*Superficie de barrido*/
    constructor(shape, path){
        this.shape = shape;
        this.path = path;
    }
    setPosBuffer(){
        var buffer = [];
        /*En cada nivel se calcula la posicion de cada punto de la forma*/
        for (var i = 0; i < this.path.levels; i++){
            /*Para cada punto de la forma se aplica la transformacion*/
            for (var j = 0; j < this.shape.levels; j++){
                /*Se define la posicion*/
                var pos = shape.getPosition(j);
                /*Se transforma el punto con la matriz de nivel*/
                var tPos = vec3.fromValues(pos.x, pos.y, pos.z);
                vec3.transformMat4(tPos, tPos, path.getLevelVertexMatrix(i));
                /*Se guarda la posicion en el position buffer*/
                for (var k = 0; k < 3, k++){
                    buffer.push(tPos[k]);
                }
            }
        }
        return buffer;
    }
    setNormalBuffer(){
        var buffer = [];
        /*En cada nivel se calcula la normal de cada punto de la forma*/
        for (var i = 0; i < this.path.levels; i++){
            /*Para cada punto de la forma se aplica la transformacion*/
            for (var j = 0; j < this.shape.levels; j++){
                /*Se define la normal*/
                var normal = shape.getNormal(j);
                /*Se transforma el punto con la matriz del nivel*/
                var tNormal = vec3.fromValues(normal.x, normal.y, normal.z);
                vec3.transformMat4(tNormal, tNormal, path.getLevelBasisMatrix(i));
                /*Se guarda la normal en el normal buffer*/
                for (var k = 0; k < 3, k++){
                    buffer.push(tNormal[k]);
                }
            }
        }
        return buffer;
    }
}
