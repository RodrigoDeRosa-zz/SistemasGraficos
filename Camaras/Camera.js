class Camera{
    constructor(){
        /*Vectores basicos de la camara*/
        this.eyePoint = vec3.create();
        this.lookAtVec = vec3.create();
        this.rightVec = vec3.create();
        this.upVec = vec3.create();
        /*Matriz de la camara*/
        this.matrix = mat4.create();
        this.initialise();
    }
    initialise(){/*TODO subclass*/}
    tick(){/*TODO subclass*/}
    zoom(){/*TODO subclass*/}
    moveBack(){/*TODO subclass*/}
    moveForward(){/*TODO subclass*/}
    moveLeft(){/*TODO subclass*/}
    moveRight(){/*TODO subclass*/}
    rollLeft(){/*TODO subclass*/}
    rollRight(){/*TODO subclass*/}
    getEyePoint(){return this.eyePoint;}
    getLookAtVec(){return this.lookAtVec;}
    getUpVec(){return this.upVec;}
    getMatrix(){return this.matrix;}
}
