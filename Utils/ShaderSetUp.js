function getRawFragmentShader(source){
    var rawFragment = new RawFragmentShader();
    rawFragment.setShaderCode(source);
    return rawFragment;
}

function getRawVertexShader(source){
    var rawVertex = new RawVertexShader();
    rawVertex.setShaderCode(source);
    return rawVertex;
}

/**********************************OBJETOS COLOREADOS**********************************************/

function getMainRawVertexShader(){
    var vertexShaderSource = `
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
}`;
    return getRawVertexShader(vertexShaderSource);
}

function getMainRawFragmentShader(){
    var fragmentShaderSource = `
precision mediump float;
varying vec3 vVertexColor;
varying vec3 vLightWeighting;

uniform sampler2D uSampler;

void main(void){
    gl_FragColor = vec4(vVertexColor.rgb * vLightWeighting, 1.0);
}`;

    return getRawFragmentShader(fragmentShaderSource);
}

/**********************************EDIFICIOS**********************************************/

function getBuildingRawVertexShader(){
    var vertexShaderSource = `
attribute vec3 aVertexPosition;
attribute vec3 aVertexNormal;
attribute vec2 aTextureCoord;

uniform mat4 uViewMatrix;
uniform mat4 uModelMatrix;
uniform mat4 uPMatrix;
uniform mat3 uNMatrix;

uniform vec3 uAmbientColor;

uniform vec3 uLightPosition;
uniform vec3 uDirectionalColor;

uniform bool uUseLighting;

varying vec2 vTextureCoord;
varying vec3 vLightWeighting;

void main(void) {
    // Transformamos al v�rtice al espacio de la c�mara
    vec4 pos_camera_view = uViewMatrix * uModelMatrix * vec4(aVertexPosition, 1.0);

    // Transformamos al v�rtice al espacio de la proyecci�n
    gl_Position = uPMatrix * pos_camera_view;

    // Coordenada de textura sin modifiaciones
    vTextureCoord = aTextureCoord;

    ////////////////////////////////////////////
    // Calculos de la iluminaci�n
    vec3 light_dir =  uLightPosition - vec3( pos_camera_view );
    normalize(light_dir);
    if (!uUseLighting){
            vLightWeighting = vec3(1.0, 1.0, 1.0);
    } else {
        vec3 transformedNormal = normalize(uNMatrix * aVertexNormal);
        float directionalLightWeighting = max(dot(transformedNormal, light_dir), 0.0);
        vLightWeighting = uAmbientColor + uDirectionalColor * directionalLightWeighting;
    }
    ////////////////////////////////////////////
}`;

    return getRawVertexShader(vertexShaderSource);
}

function getBuildingRawFragmentShader(){
    var fragmentShaderSource = `
precision mediump float;

varying vec2 vTextureCoord;
varying vec3 vLightWeighting;

uniform sampler2D uSampler;

void main(void) {
    vec4 textureColor = texture2D(uSampler, vec2(vTextureCoord.s, vTextureCoord.t));
    gl_FragColor = vec4(textureColor.rgb * vLightWeighting, textureColor.a);
}`;
    return getRawFragmentShader(fragmentShaderSource);
}
