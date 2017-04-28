//Atributos de cada vertice
attribute vec3 aVertexPosition;
attribute vec3 aVertexNormal;
attribute vec3 aVertexColor;
//Matrices
uniform mat4 uViewMatrix;
uniform mat4 uModelMatrix;
uniform mat4 uPMatrix;
uniform mat3 uNMatrix;
//Iluminacion
uniform vec3 uAmbientColor;
uniform vec3 uLightPosition;
uniform vec3 uDirectionalColor;
uniform bool uUseLighting;
////
varying vec3 vVertexColor;
varying vec3 vLightWeighting;

void main(void){
    //Se transforma al vertice al espacio de camara
    vec4 pos_camera_view = uViewMatrix * uModelMatrix * vec4(aVertexPosition, 1.0);
    //Se transforma al vertice al espacio de la proyeccion
    gl_Position = uPMatrix * pos_camera_view;
    //El color no se modifica
    vVertexColor = aVertexColor;
    /********************************************/
    //Calculos de iluminacion
    vec3 light_dir = uLightPosition;
    normalize(light_dir);
    if(!uUseLighting){
        vLightWeighting = vec3(1.0, 1.0, 1.0);
    } else {
        vec3 transformedNormal = normalize(uNMatrix * aVertexNormal);
        float directionalLightWeighting = max(dot(transformedNormal, light_dir), 0.0);
        vLightWeighting = uAmbientColor + uDirectionalColor * directionalLightWeighting;
    }
}
