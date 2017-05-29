class RevoltSurface{
    /**Superficie de revolucion.
      * @param {shape} Shape Es la forma que será girada.
      * @param {levels} integer Cantidad de niveles de la revolucion.
      * @param {axis} vec3 Eje sobre el cual se hace la revolucion
    */
    constructor(shape, levels, axis){
        this.shape = shape;
        this.levels = levels;
        this.axis = axis;
    }
    setPosBuffer(){
        var buffer = [];
        /*Para cada nivel de la revolucion se define cada punto de la forma*/
        for (var i = 0; i < this.levels; i++){
            /*Se define la matriz de rotacion del nivel*/
            var rotMat = mat4.create();
            mat4.identity(rotMat);
            //angulo = 2PI(nivelActua)/(nivelesTotales-1)
            mat4.rotate(rotMat, rotMat, (Math.PI*2*i)/(this.levels-1), this.axis);
            /*Para cada punto de la forma se aplica la transformacion*/
            for (var j = 0; j < this.shape.getLevels(); j++){
                var pos = this.shape.getPosition(j);
                var vPos = vec3.fromValues(pos.x, pos.y, pos.z);
                /*Se transforma el punto con la matriz del nivel*/
                vec3.transformMat4(vPos, vPos, rotMat);

                /*Se guarda el punto transformado en el buffer*/
                for (var k = 0; k < 3; k++){
                    buffer.push(vPos[k]);
                }
            }
        }
        return buffer;
    }
    setNormalBuffer(){
        var buffer = [];
        /*Para cada nivel se calcula la normal de cada punto de la forma*/
        for (var i = 0; i < this.levels; i++){
            /*Matriz de rotacion del nivel*/
            var rotMat = mat4.create();
            mat4.identity(rotMat);
            mat4.rotate(rotMat, rotMat, (Math.PI*2*i)/(this.levels-1), this.axis);
            /*Para cada punto de la forma se aplica la transformacion*/
            for (var j = 0; j < this.shape.getLevels(); j++){
                var normal = this.shape.getNormal(j);
                var vNormal = vec3.fromValues(normal.x, normal.y, normal.z);

                /*Se transforma la normal con la matriz del nivel*/
                vec3.transformMat4(vNormal, vNormal, rotMat);

                /*Se guarda el punto transformado en el buffer*/
                for (var k = 0; k < 3; k++){
                    buffer.push(vNormal[k]);
                }
            }
        }
        return buffer;
    }
    setTextureBuffer(){
        var buffer = [];
        var shapeLevels = this.shape.getLevels();
        var u, v;
        /*En cada nivel se calcula la componente v*/
        for (var i = 0; i < this.levels; i++){
            v = i / (this.levels-1); //Entre 0 y 1
            /*Para cada punto se calcula la componente u*/
            for (var j = 0; j < shapeLevels; j++){
                u = j / (shapeLevels-1); //Entre 0 y 1
                buffer.push(u);
                buffer.push(v);
            }
        }
        return buffer;
    }
}
