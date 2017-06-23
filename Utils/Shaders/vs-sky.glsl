//Atributos de cada vertice
attribute vec3 aVertexPosition;
attribute vec2 aTextureCoord;
//Matrices
uniform mat4 uViewMatrix;
uniform mat4 uModelMatrix;
uniform mat4 uPMatrix;
////
varying vec2 vTextureCoord;
varying vec3 vLightWeighting;

void main(void){
    //Se transforma al vertice al espacio de camara
    vec4 pos_camera_view = uViewMatrix * uModelMatrix * vec4(aVertexPosition, 1.0);
    //Se transforma al vertice al espacio de la proyeccion
    gl_Position = uPMatrix * pos_camera_view;
    //El color no se modifica
    vTextureCoord = aTextureCoord;
    /********************************************/
    vLightWeighting = vec3(1.0, 1.0, 1.0);
}
