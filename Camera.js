class Camera{
    cosntructor(){
        /*Vectores basicos de la camara*/
        this.eyePoint = vec3.create();
        this.lookAtVec = vec3.create();
        this.rightVec = vec3.create();
        this.upVec = vec3.create();
        /*Matriz de la camara*/
        this.matrix = mat4.create();
    }
}
