class Path extends Shape{
    constructor(){
        super();
        /*Indica si se hace cambio de base a cada paso o no*/
        this.rotate = true;
        /*Arreglo de matrices de transformacion de cada nivel*/
        this.vertexMatrices = [];
        /*Arreglo de matrices de cambio de base para cada nivel*/
        this.basisMatrices = [];
        this.setBasisMatrices();
        this.setVertexMatrices();
    }
    toggleRotate(bool){
        this.rotate = bool;
    }
    /*Crea el arreglo donde se guardan todas las matrices de cambio de base
    para cada nivel.*/
    setBasisMatrices(){
        for (var i = 0; i < this.levels; i++){
            /*Tangente y Normal como objetos de clase Punto*/
            var tan = this.tangents[i];
            var norm = this.normals[i];
            /*Los pasamos a vectores de tipo vec3*/
            var vTan = vec3.fromValues(tan.x, tan.y, tan.z);
            var vNorm = vec3.fromValues(norm.x, norm.y, norm.z);
            var vBin = vec3.create(); //Binormal
            /*Se calcula la binormal en cada nivel*/
            vec3.cross(vBin, vTan, vNorm);

            /*Se crea la matriz de cambio de base para cada nivel del camino*/
            var matrix = mat4.create();
            mat4.identity(matrix);
            /*Los vectores deben estar normalizados*/
            vec3.normalize(vTan, vTan);
            vec3.normalize(vNorm, vNorm);
            vec3.normalize(vBin, vBin);
            /*Se define la matriz*/
            matrix = [ vNorm[0], vBin[0], vTan[0], 0,
                       vNorm[1], vBin[1], vTan[1], 0,
                       vNorm[2], vBin[2], vTan[2], 0,
                       0,        0,       0,       1];
            /*Se agrega la matriz a la lista*/
            this.basisMatrices.push(matrix);
        }
    }
    /*Crea el arreglo donde se guardan las matrices de transformacion de
    cada nivel*/
    setVertexMatrices(){
        for (var i = 0; i < this.levels; i++){
            /*Posicion como objeto de clase Punto*/
            var pos = this.positions[i];
            /*Lo pasamos a vector de tipo vec3*/
            var vPos = vec3.fromValues(pos.x, pos.y, pos.z);
            /*Se define la matriz de translacion hacia el punto actual del
            path*/
            var transMat = mat4.create();
            mat4.identity(transMat);
            mat4.translate(transMat, transMat, vPos);
            /*Se define la matriz de transformacion que combina la translacion
            hacia el punto actual del path y la rotacion(cambio de base a
            los nuevos ejes)*/
            var vertexMat = mat4.create();
            mat4.identity(vertexMat);
            mat4.multiply(vertexMat, vertexMat, transMat);
            /*Si el flag lo indica, se multiplica por el cambio de base*/
            if(this.rotate) mat4.multiply(vertexMat, vertexMat, this.basisMatrices[i]);
            /*Se agrega la matriz a la lista*/
            this.vertexMatrices.push(vertexMat);
        }
    }
}
