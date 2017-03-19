class Objeto3D extends Contenedor3D{
    /*Objeto 3D generico*/
    constructor(){
        super();
        this.drawType = gl.TRIANGLE_STRIP;

        this.posBuffer = null;
        this.indexBuffer = null;
        this.colorBuffer = null;
        this.normalBuffer = null;

        this.webglPosBuffer = null;
        this.webglNormalBuffer = null;
        this.webglColorBuffer = null;
        this.webglIndexBuffer = null;

        this.posBufferCreator = null;
        this.normalBufferCreator = null;
        this.colorBufferCreator = null;
        this.indexBufferCreator = null;
    }
    /********METODOS DE MODELADO************/
    /*Todos los creadores son objetos capaces de crear un buffer del tipo indicado,
    a travez del metodo "setXXXXBuffer()".*/
    /*Define al constructor de indexBuffer */
    setIndexCreator(indexer){
        this.indexBufferCreator = indexer;
    }
    /*Define al constructor de colorBuffer*/
    setColorCreator(colorer){
        this.colorBufferCreator = colorer;
    }
    /*Define al constructor de positionBuffer*/
    setPosCreator(positioner){
        this.posBufferCreator = positioner;
    }
    /*Define al constructor de normalBuffer*/
    setNormalCreator(normalC){
        this.normalBufferCreator = normalC;
    }

    /**********METODOS DE DIBUJADO**********/
    /*Construye los buffers con las funciones constructoras*/
    build(){
        this.posBuffer = this.posBufferCreator.setPosBuffer();
        this.normalBuffer = this.normalBufferCreator.setNormalBuffer();
        this.colorBuffer = this.colorBufferCreator.setColorBuffer();
        this.indexBuffer = this.indexBufferCreator.setIndexBuffer();

        this.setUpWebGLBuffers();
    }
    /*Setea los WebGlBuffers para la hora de renderizar*/
    setUpWebGLBuffers(){
        this.webglPosBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, this.webglPosBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.posBuffer), gl.STATIC_DRAW);

        this.webglNormalBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, this.webglNormalBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.normalBuffer), gl.STATIC_DRAW);

        this.webglColorBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, this.webglColorBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.colorBuffer), gl.STATIC_DRAW);

        this.webglIndexBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.webglIndexBuffer);
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(this.indexBuffer), gl.STATIC_DRAW);
    }
    /*Dibuja al objeto. Recibe la matriz de modelado base, la matriz de la camara y la matriz de proyeccion*/
    //Override
    draw(mMatrix, CameraMatrix, pMatrix){
        //Se crea una matriz nueva para no modificar la matriz del padre
        var modelMatrix = mat4.create();
        mat4.multiply(modelMatrix, mMatrix, this.matrix);
        //Se hace un llamado al draw de los hijos, uno por uno.
        this._drawChildren(modelMatrix, CameraMatrix, pMatrix);
        //Matriz de proyeccion y vista
        gl.uniformMatrix4fv(this.shaderProgram.pMatrixUniform, false, pMatrix);
        gl.uniformMatrix4fv(this.shaderProgram.ViewMatrixUniform, false, CameraMatrix);

        var itemSize = 3;
        //Position
        gl.bindBuffer(gl.ARRAY_BUFFER, this.webglPosBuffer);
        gl.vertexAttribPointer(this.shaderProgram.vertexPositionAttribute, itemSize, gl.FLOAT, false, 0, 0);
        //Color
        gl.bindBuffer(gl.ARRAY_BUFFER, this.webglColorBuffer);
        gl.vertexAttribPointer(this.shaderProgram.vertexColorAttribute, itemSize, gl.FLOAT, false, 0, 0);
        //Normal
        gl.bindBuffer(gl.ARRAY_BUFFER, this.webglNormalBuffer, itemSize, gl.FLOAT, false, 0, 0);
        gl.vertexAttribPointer(this.shaderProgram.vertexNormalAttribute, itemSize, gl.FLOAT, false, 0, 0);

        //Matriz de normales. Se define como la traspuesta de la inversa de la matriz de modelado
        gl.uniformMatrix4fv(this.shaderProgram.ModelMatrixUniform, false, modelMatrix);
        var normalMatrix = mat3.create();
        mat3.fromMat4(normalMatrix, modelMatrix);
        mat3.invert(normalMatrix, normalMatrix);
        mat3.transpose(normalMatrix, normalMatrix);
        gl.uniformMatrix3fv(this.shaderProgram.nMatrixUniform, false, normalMatrix);

        //Index
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.webglIndexBuffer);
        //Draw
        gl.drawElements(this.drawType, this.indexBuffer.length, gl.UNSIGNED_SHORT, 0);
    }
}
