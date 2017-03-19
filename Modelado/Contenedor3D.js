class Contenedor3D{
    constructor(){
        this.matrix = null;
        this._setMatrix();

        this.children = [];
        this.shaderProgram = null;
    }
    /*Crear matriz de modelado*/
    _setMatrix(){
        this.matrix = mat4.create();
        mat4.identity(this.matrix);
    }

    /********METODOS DE MODELADO************/
    /*Resetea la matriz de modelado*/
    resetMatrix(){
        this._setMatrix();
    }
    /*Translacion en los valores x,y,z indicados*/
    translate(x, y, z){
        mat4.translate(this.matrix, this.matrix, vec3.fromValues(x, y, z));
    }
    /*Rotacion sobre el eje dado por las coordenadas indicadas, en el angulo dado*/
    rotate(angle, x, y, z){
        mat4.rotate(this.matrix, this.matrix, angle, vec3.fromValues(x, y, z));
    }
    /*Escala en las proporciones dadas de x, y, z*/
    scale(x, y, z){
        mat4.scale(this.matrix, this.matrix, vec3.fromValues(x, y, z));
    }
    /*Multiplica a derecha a la matriz del objeto por la mat4 recibida*/
    applyMatrix(matrix){
        mat4.multiply(this.matrix, this.matrix, matrix);
    }
    /*Define a la matrix del objeto como la mat4 recibida*/
    setMatrix(matrix){
        this.matrix = matrix;
    }
    /*Agrega como hijo a el Objeto3D o Contenedor3D recibido*/
    addChild(child){
        this.children.push(child);
    }
    /*Quita al hijo indicado*/
    removeChild(child){
        var index = this.children.indexOf(child);
        this.children.splice(index, 1);
    }
    /**********METODOS DE DIBUJADO**********/
    /*Define el shader program a utilizar por el GLProgram*/
    setShaderProgram(shaderProgram){
        this.shaderProgram = shaderProgram;
        gl.useProgram(shaderProgram);
    }
    /*Configura la iluminacion. ALERT: Debe estar definido el Shader Program*/
    setupLighting(lightPosition, ambientColor, diffuseColor){
        this.setupChildrenLighting(lightPosition, ambientColor, diffuseColor);

        gl.uniform1i(this.shaderProgram.useLightingUniform, true);
        //Define direccion
        gl.uniform3fv(this.shaderProgram.lightingDirectionUniform, lightPosition);
        //Define ambient color
        gl.uniform3fv(this.shaderProgram.ambientColorUniform, ambientColor);
        //Define diffuse color
        gl.uniform3fv(this.shaderProgram.directionalColorUniform, diffuseColor);
    }
    /*Configura la iluminacion de los hijos*/
    setupChildrenLighting(lightPosition, ambientColor, diffuseColor){
        for (var i = 0; i < this.children.length; i++){
            var child = this.children[i];
            child.setupLighting(lightPosition, ambientColor, diffuseColor);
        }
    }
    /*Dibuja al objeto. Recibe la matriz de modelado base, la matriz de la camara y la matriz de proyeccion*/
    draw(mMatrix, CameraMatrix, pMatrix){
        //Se crea una matriz nueva para no modificar la matriz del padre
        var modelMatrix = mat4.create();
        mat4.multiply(modelMatrix, mMatrix, this.matrix);
        //Se hace un llamado al draw de los hijos, uno por uno.
        this._drawChildren(modelMatrix, CameraMatrix, pMatrix);
    }
    /*Dibuja a los hijos*/
    _drawChildren(modelMatrix, CameraMatrix, pMatrix){
        for (var i = 0; i < this.children.length; i++){
            var child = this.children[i];
            child.draw(modelMatrix, CameraMatrix, pMatrix);
        }
    }
}
