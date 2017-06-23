class Object3D extends Container3D{
    /*Objeto 3D generico*/
    constructor(){
        super();

        /*Animacion*/
        this.id = null;
        this.building = false; this.highway = false;
        this.street = false;
        this.x; this.y;
        this.shininess = 0.5;
        this.scaleXTop = 1.0; this.scaleXLow = 1.0; this.scaleYTop = 1.0; this.scaleYLow = 1.0;
        this.lim;
        //FIN ANIMACION
        this.posBuffer = null;
        this.indexBuffer = null;
        this.colorBuffer = null;
        this.textureBuffer = null;
        this.tangentBuffer = null;
        this.normalBuffer = null;

        this.webglPosBuffer = null;
        this.webglNormalBuffer = null;
        this.webglTangentBuffer = null;
        this.webglColorBuffer = null;
        this.webglTextureBuffer = null;
        this.webglIndexBuffer = null;

        this.posBufferCreator = null;
        this.normalBufferCreator = null;
        this.tangentBufferCreator = null;
        this.colorBufferCreator = null;
        this.textureBufferCreator = null;
        this.indexBufferCreator = null;
    }
    /**********METODOS DE MODELADO*************/
    /**Define al constructor de indexBuffer.
      * @param {indexer} Object Objeto con metodo setIndexBuffer que devuelve array
    */
    setIndexCreator(indexer){
        this.indexBufferCreator = indexer;
    }
    /**Define al constructor de colorBuffer.
      * @param {colorer} Object Objeto con metodo setColorBuffer que devuelve array
    */
    setColorCreator(colorer){
        this.colorBufferCreator = colorer;
    }
    /**Define al constructor de positionBuffer
      * @param {positioner} Object Objeto con metodo setPosBuffer que devuelve array
    */
    setPosCreator(positioner){
        this.posBufferCreator = positioner;
    }
    /**Define al constructor del textureBuffer
      * @param {uvC} Object Objeto con metodo setTextureBuffer que devuelve array
    */
    setTextureCreator(uvC){
        this.textureBufferCreator = uvC;
    }
    /**Define al constructor de normalBuffer.
      * @param {normalC} Object Objeto con metodo setNormalBuffer que devuelve array
    */
    setNormalCreator(normalC){
        this.normalBufferCreator = normalC;
    }
    /**Define al constructor de tangentBuffer.
      * @param {tangentC} Object Objeto con metodo setTangentBuffer que devuelve array
    */
    setTangentCreator(tangentC){
        this.tangentBufferCreator = tangentC;
    }
    /**********METODOS DE DIBUJADO**********/
    /*Construye los buffers con las funciones constructoras*/
    build(){
        this.posBuffer = this.posBufferCreator.setPosBuffer();
        if (this.normalBufferCreator) this.normalBuffer = this.normalBufferCreator.setNormalBuffer();
        if (this.tangentBufferCreator) this.tangentBuffer = this.tangentBufferCreator.setTangentBuffer();
        if (this.colorBufferCreator) this.colorBuffer = this.colorBufferCreator.setColorBuffer();
        if (this.textureBufferCreator) this.textureBuffer = this.textureBufferCreator.setTextureBuffer();
        this.indexBuffer = this.indexBufferCreator.setIndexBuffer();

        this.setUpWebGLBuffers();
    }
    /*Setea los WebGlBuffers para la hora de renderizar*/
    setUpWebGLBuffers(){
        this.webglPosBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, this.webglPosBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.posBuffer), gl.STATIC_DRAW);
        this.webglPosBuffer.itemSize = 3;
        this.webglPosBuffer.numItems = this.posBuffer.length / 3;

        if (this.normalBuffer){
            this.webglNormalBuffer = gl.createBuffer();
            gl.bindBuffer(gl.ARRAY_BUFFER, this.webglNormalBuffer);
            gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.normalBuffer), gl.STATIC_DRAW);
            this.webglNormalBuffer.itemSize = 3;
            this.webglNormalBuffer.numItems = this.normalBuffer.length / 3;
        }

        if (this.tangentBuffer){
            this.webglTangentBuffer = gl.createBuffer();
            gl.bindBuffer(gl.ARRAY_BUFFER, this.webglTangentBuffer);
            gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.tangentBuffer), gl.STATIC_DRAW);
            this.webglTangentBuffer.itemSize = 3;
            this.webglTangentBuffer.numItems = this.tangentBuffer.length / 3;
        }

        if (this.colorBuffer){
            this.webglColorBuffer = gl.createBuffer();
            gl.bindBuffer(gl.ARRAY_BUFFER, this.webglColorBuffer);
            gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.colorBuffer), gl.STATIC_DRAW);
            this.webglColorBuffer.itemSize = 3;
            this.webglColorBuffer.numItems = this.colorBuffer.length / 3;
        }

        if (this.textureBuffer){
            this.webglTextureBuffer = gl.createBuffer();
            gl.bindBuffer(gl.ARRAY_BUFFER, this.webglTextureBuffer);
            gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.textureBuffer), gl.STATIC_DRAW);
            this.webglTextureBuffer.itemSize = 2;
            this.webglTextureBuffer.numItems = this.textureBuffer.length / 2;
        }

        this.webglIndexBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.webglIndexBuffer);
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(this.indexBuffer), gl.STATIC_DRAW);
        this.webglIndexBuffer.itemSize = 1;
        this.webglIndexBuffer.numItems = this.indexBuffer.length;
    }
    /**Dibuja al objeto. Recibe la matriz de modelado base, la matriz de la camara
      *y la matriz de proyeccion.
      * **Override**
      * @param {mMatrix} mat4 Matriz de modelado del padre.
      * @param {CameraMatrix} mat4 Matriz de camara
      * @param {pMatrix} mat4 Matriz de proyeccion
      * @param {parentMod} bool Indica si el padre fue modificado o no
    */
    draw(mMatrix, CameraMatrix, pMatrix, parentMod){
        //Se crea una matriz nueva para no modificar la matriz del padre
        var modelMatrix = mat4.create();
        if(this.modified || parentMod){
            mat4.multiply(modelMatrix, mMatrix, this.matrix);
            mat4.multiply(this.prevModelMatrix, modelMatrix, mat4.create());
        } else mat4.multiply(modelMatrix, this.prevModelMatrix, mat4.create());
        //Se hace un llamado al draw de los hijos, uno por uno.
        this._drawChildren(modelMatrix, CameraMatrix, pMatrix, this.modified || parentMod);
        this.modified = false;
        /*Se indica que shader se debe usar*/
        gl.useProgram(this.shaderProgram);
        //Matriz de proyeccion, vista y modelado
        gl.uniformMatrix4fv(this.shaderProgram.ModelMatrixUniform, false, modelMatrix);
        gl.uniformMatrix4fv(this.shaderProgram.pMatrixUniform, false, pMatrix);
        gl.uniformMatrix4fv(this.shaderProgram.ViewMatrixUniform, false, CameraMatrix);

        //Position
        gl.bindBuffer(gl.ARRAY_BUFFER, this.webglPosBuffer);
        gl.vertexAttribPointer(this.shaderProgram.vertexPositionAttribute, this.webglPosBuffer.itemSize, gl.FLOAT, false, 0, 0);
        //Color
        if (this.webglColorBuffer){
            gl.bindBuffer(gl.ARRAY_BUFFER, this.webglColorBuffer);
            gl.vertexAttribPointer(this.shaderProgram.vertexColorAttribute, this.webglColorBuffer.itemSize, gl.FLOAT, false, 0, 0);
        }
        //Texture
        if (this.webglTextureBuffer){
            gl.bindBuffer(gl.ARRAY_BUFFER, this.webglTextureBuffer);
            gl.vertexAttribPointer(this.shaderProgram.textureCoordAttribute, this.webglTextureBuffer.itemSize, gl.FLOAT, false, 0, 0);
        }
        //Se setea el id dependiendo el shader para definir la textura
        if (this.building){
            this.shininess = 1.0;
            //Se setean todas las variables construccion
            gl.uniform1f(buildingShader.x, this.x);
            gl.uniform1f(buildingShader.y, this.y);
            gl.uniform1f(buildingShader.lim, this.lim);
            gl.uniform1f(buildingShader.topX, this.scaleXTop);
            gl.uniform1f(buildingShader.topY, this.scaleYTop);
            gl.uniform1f(buildingShader.lowX, this.scaleXLow);
            gl.uniform1f(buildingShader.lowY, this.scaleYLow);
            //Se setean las texturas
            if (this.scaleYTop < 0){ //techo
                gl.activeTexture(gl.TEXTURE0);
                gl.bindTexture(gl.TEXTURE_2D, upperTextures[upperTextures.length-1]);
                gl.uniform1i(buildingShader.roofSampler, 0);
                //Normal map
                gl.activeTexture(gl.TEXTURE1);
                gl.bindTexture(gl.TEXTURE_2D, upperNormals[upperNormals.length-1]);
                gl.uniform1i(streetShader.topNormalSampler, 1);
            } else {
                //Parte de arriba
                gl.activeTexture(gl.TEXTURE0);
                gl.bindTexture(gl.TEXTURE_2D, upperTextures[this.id]);
                gl.uniform1i(buildingShader.topSampler, 0);
                //Parte de abajo
                gl.activeTexture(gl.TEXTURE1);
                gl.bindTexture(gl.TEXTURE_2D, lowerTextures[this.id]);
                gl.uniform1i(buildingShader.lowSampler, 1);
                //Normal superior
                gl.activeTexture(gl.TEXTURE2);
                gl.bindTexture(gl.TEXTURE_2D, upperNormals[this.id]);
                gl.uniform1i(buildingShader.topNormalSampler, 2);
                //Normal inferior
                gl.activeTexture(gl.TEXTURE3);
                gl.bindTexture(gl.TEXTURE_2D, lowerNormals[this.id]);
                gl.uniform1i(buildingShader.lowNormalSampler, 3);
            }
        } else if (this.street){
            gl.uniform1f(streetShader.shininess, this.shininess);
            gl.uniform1f(streetShader.x, this.scaleXTop);
            gl.uniform1f(streetShader.y, this.scaleYTop);
            //Texture
            gl.activeTexture(gl.TEXTURE0);
            gl.bindTexture(gl.TEXTURE_2D, streetTextures[this.id]);
            gl.uniform1i(streetShader.uSampler, 0);
            //Normal map
            gl.activeTexture(gl.TEXTURE1);
            gl.bindTexture(gl.TEXTURE_2D, streetNormalMaps[this.id]);
            gl.uniform1i(streetShader.normalSampler, 1);
            //Specular
            if (this.shininess > 1.0) gl.uniform3fv(this.shaderProgram.specularColorUniform, [0.75, 0.55, 0.45]);
            else gl.uniform3fv(this.shaderProgram.specularColorUniform, [0.05, 0.035, 0.025]);
            //Spotlights
            gl.uniform1i(this.shaderProgram.useSpot, this.highway);
            gl.uniform3fv(this.shaderProgram.spotlightsPosArray, spotLightPos);
            gl.uniform3fv(this.shaderProgram.spotlightsDirArray, spotLightDir);
            gl.uniform3fv(this.shaderProgram.spotlightsColorArray, spotLightColor);
        } else if (this.sky){
            gl.activeTexture(gl.TEXTURE0);
            gl.bindTexture(gl.TEXTURE_2D, streetTextures[streetTextures.length-1]);
            gl.uniform1i(skyShader.texSampler, 0);
        }

        if (this.useLight){
            //Normal
            gl.bindBuffer(gl.ARRAY_BUFFER, this.webglNormalBuffer);
            gl.vertexAttribPointer(this.shaderProgram.vertexNormalAttribute, this.webglNormalBuffer.itemSize, gl.FLOAT, false, 0, 0);
            //Tangente
            if (this.tangentBuffer){
                gl.bindBuffer(gl.ARRAY_BUFFER, this.webglTangentBuffer);
                gl.vertexAttribPointer(this.shaderProgram.vertexTangentAttribute, this.webglTangentBuffer.itemSize, gl.FLOAT, false, 0, 0);
            }

            //Matriz de normales. Se define como la traspuesta de la inversa de la matriz de modelado
            var normalMatrix = mat3.create();
            mat3.fromMat4(normalMatrix, modelMatrix);
            mat3.invert(normalMatrix, normalMatrix);
            mat3.transpose(normalMatrix, normalMatrix);
            gl.uniformMatrix3fv(this.shaderProgram.nMatrixUniform, false, normalMatrix);
        }

        //Index
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.webglIndexBuffer);
        //Draw
        gl.drawElements(globalDrawType, this.webglIndexBuffer.numItems, gl.UNSIGNED_SHORT, 0);
    }
}
