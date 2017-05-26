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
    attribute float aID;

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
    varying float vID;

    uniform float t;
    uniform float lim;
    uniform float x;
    uniform float y;

    void main(void) {
        float escalaZ = 0.0;

        vec4 auxPos = vec4(aVertexPosition, 1.0);
        if (t > lim){
            float newT = t - lim;
            escalaZ = min(1.0, newT * 0.1);
        }
        auxPos.z = -auxPos.z * escalaZ;
        if ( aID == 20.0 && escalaZ != 1.0 ) auxPos = vec4(0.0, 0.0, 0.0, 1.0);

        // Transformamos al v�rtice al espacio de la c�mara
        vec4 pos_camera_view = uViewMatrix * uModelMatrix * vec4(auxPos.xyz, 1.0);

        // Transformamos al v�rtice al espacio de la proyecci�n
        gl_Position = uPMatrix * pos_camera_view;

        //Se pasa el id
        vID = aID;

        // Coordenada de textura modificada
        vec2 auxUV = aTextureCoord;
        if (t > lim) auxUV.y = auxUV.y * escalaZ;
        vTextureCoord = auxUV;

        ////////////////////////////////////////////
        // Calculos de la iluminaci�n
        vec3 light_dir =  uLightPosition - vec3( pos_camera_view );
        normalize(light_dir);
        if (!uUseLighting)
        {
            vLightWeighting = vec3(1.0, 1.0, 1.0);
        }
        else
        {
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
    precision highp float;

    varying vec2 vTextureCoord;
    varying vec3 vLightWeighting;

    //Texturas de pisos
    uniform sampler2D sTop1;
    uniform sampler2D sTop2;
    uniform sampler2D sTop3;
    uniform sampler2D sTop4;
    uniform sampler2D sTop5;
    uniform sampler2D sTop6;
    uniform sampler2D sTop7;
    uniform sampler2D sTop8;
    //Texturas de planta baja
    uniform sampler2D sLow1;
    uniform sampler2D sLow2;
    uniform sampler2D sLow3;
    uniform sampler2D sLow4;
    uniform sampler2D sLow5;
    uniform sampler2D sLow6;
    uniform sampler2D sLow7;
    //Textura de techo
    uniform sampler2D sRoof;

    varying float vID;

    uniform float t;
    uniform float lim;
    uniform float x;
    uniform float y;

    void main(void) {
        vec4 textureColor;
        vec2 auxUV = vTextureCoord;
        auxUV.y = vTextureCoord.y * y * 1.5;
        auxUV.x = vTextureCoord.x * x * 1.5;

        if (auxUV.y > 0.25){
            auxUV.y = auxUV.y - 0.25;
            if (vID == 0.0) textureColor = texture2D(sTop1, auxUV);
            else if (vID == 1.0) textureColor = texture2D(sTop2,  auxUV);
            else if (vID == 2.0){
                auxUV.y = auxUV.y * 0.5;
                textureColor = texture2D(sTop3,  auxUV);
            } else if (vID == 3.0){
                textureColor = texture2D(sTop4,  auxUV);
            } else if (vID == 4.0){
                auxUV.y = auxUV.y * 0.5;
                textureColor = texture2D(sTop5,  auxUV);
            } else if (vID == 5.0){
                auxUV.y = auxUV.y * 0.5;
                textureColor = texture2D(sTop6,  auxUV);
            } else if (vID == 6.0){
                textureColor = texture2D(sTop7,  auxUV);
            } else if (vID == 7.0){
                textureColor = texture2D(sTop8,  auxUV);
            }
        } else {
            auxUV.x = auxUV.x * 2.0;
            auxUV.y = auxUV.y * 2.0;
            if (vID == 0.0){
                auxUV.y = auxUV.y * 2.0;
                textureColor = texture2D(sLow1, auxUV);
            } else if (vID == 1.0){
                auxUV.y = auxUV.y * 2.0;
                textureColor = texture2D(sLow2,  auxUV);
            } else if (vID == 2.0){
                textureColor = texture2D(sLow3,  auxUV);
            } else if (vID == 3.0){
                auxUV.y = auxUV.y * 2.0;
                auxUV.x = auxUV.x * 0.5;
                textureColor = texture2D(sLow4,  auxUV);
            } else if (vID == 4.0){
                textureColor = texture2D(sLow5,  auxUV);
            } else if (vID == 5.0){
                textureColor = texture2D(sLow6,  auxUV);
            } else if (vID == 6.0 || vID == 7.0){
                auxUV.y = auxUV.y * 2.0;
                auxUV.x = auxUV.x * 0.5;
                textureColor = texture2D(sLow7,  auxUV);
            }
        }
        if (vID == 20.0) textureColor = texture2D(sRoof,  vec2(vTextureCoord.s, vTextureCoord.t));

        gl_FragColor = vec4(textureColor.rgb * vLightWeighting, textureColor.a);
    }
`;
    return getRawFragmentShader(fragmentShaderSource);
}

/**********************************CALLES**********************************************/

function getStreetRawVertexShader(){
    var vertexShaderSource = `
    attribute vec3 aVertexPosition;
    attribute vec3 aVertexNormal;
    attribute vec2 aTextureCoord;
    attribute float aID;

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
    varying float vID;

    void main(void) {

        // Transformamos al v�rtice al espacio de la c�mara
        vec4 pos_camera_view = uViewMatrix * uModelMatrix * vec4(aVertexPosition, 1.0);

        // Transformamos al v�rtice al espacio de la proyecci�n
        gl_Position = uPMatrix * pos_camera_view;
        //Se pasa el id del objeto
        vID = aID;
        // Coordenada de textura sin modifiaciones
        vTextureCoord = aTextureCoord;

        ////////////////////////////////////////////
        // Calculos de la iluminaci�n
        vec3 light_dir =  uLightPosition - vec3( pos_camera_view );
        normalize(light_dir);
        if (!uUseLighting)
        {
            vLightWeighting = vec3(1.0, 1.0, 1.0);
        }
        else
        {
            vec3 transformedNormal = normalize(uNMatrix * aVertexNormal);
            float directionalLightWeighting = max(dot(transformedNormal, light_dir), 0.0);
            vLightWeighting = uAmbientColor + uDirectionalColor * directionalLightWeighting;
        }
        ////////////////////////////////////////////
    }`;

    return getRawVertexShader(vertexShaderSource);
}

function getStreetRawFragmentShader(){
    var fragmentShaderSource = `
    precision highp float;

    varying vec2 vTextureCoord;
    varying vec3 vLightWeighting;

    uniform sampler2D streetTex;
    uniform sampler2D crossTex;
    uniform sampler2D sidewalkTex;
    uniform sampler2D grassTex;

    varying float vID;

    void main(void) {
        vec4 textureColor;

        if (vID == 0.0) textureColor = texture2D(streetTex, vec2(vTextureCoord.s, vTextureCoord.t));
        else if (vID == 1.0) textureColor = texture2D(crossTex, vec2(vTextureCoord.s, vTextureCoord.t));
        else if (vID == 2.0) textureColor = texture2D(sidewalkTex, vec2(vTextureCoord.s, vTextureCoord.t));
        else if (vID == 3.0) textureColor = texture2D(grassTex, vec2(vTextureCoord.s, vTextureCoord.t));

        gl_FragColor = vec4(textureColor.rgb * vLightWeighting, textureColor.a);
    }
`;
    return getRawFragmentShader(fragmentShaderSource);
}
