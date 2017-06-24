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

function getSkyRawVertexShader(){
    var vertexShaderSource = `
    //Atributos de cada vertice
    attribute vec3 aVertexPosition;
    attribute vec2 aTextureCoord;
    //Matrices
    uniform mat4 uViewMatrix;
    uniform mat4 uModelMatrix;
    uniform mat4 uPMatrix;
    ////
    varying vec2 vTextureCoord;

    void main(void){
        //Se transforma al vertice al espacio de camara
        vec4 pos_camera_view = uViewMatrix * uModelMatrix * vec4(aVertexPosition, 1.0);
        //Se transforma al vertice al espacio de la proyeccion
        gl_Position = uPMatrix * pos_camera_view;
        //El color no se modifica
        vTextureCoord = aTextureCoord;
    }
    `;
    return getRawVertexShader(vertexShaderSource);
}

function getSkyRawFragmentShader(){
    var fragmentShaderSource = `
    precision highp float;
    varying vec2 vTextureCoord;

    uniform sampler2D uSampler;

    uniform bool uSpotsOn;

    void main(void){
        vec4 textureColor = texture2D(uSampler, vTextureCoord);
        vec3 light = vec3(1.0, 1.0, 1.0);
        if (uSpotsOn) light = vec3(0.1, 0.1, 0.15);
        gl_FragColor = vec4(textureColor.rgb * light, textureColor.a);
    }
    `;

    return getRawFragmentShader(fragmentShaderSource);
}

/**********************************EDIFICIOS**********************************************/

function getBuildingRawVertexShader(){
    var vertexShaderSource = `
    attribute vec3 aVertexPosition;
    attribute vec3 aVertexNormal;
    attribute vec3 aVertexTangent;
    attribute vec2 aTextureCoord;

    uniform mat4 uViewMatrix;
    uniform mat4 uModelMatrix;
    uniform mat4 uPMatrix;
    uniform mat3 uNMatrix;

    uniform vec3 uLightPosition;

    varying vec2 vTextureCoord;
    varying vec3 vVertexNormal;
    varying vec3 vLightDir;
    varying vec3 vViewDir;

    uniform float t;
    uniform float lim;
    uniform float scaleYTop;

    void main(void) {
        float escalaZ = 0.0;

        vec4 auxPos = vec4(aVertexPosition, 1.0);
        if (t > lim){
            float newT = t - lim;
            escalaZ = min(1.0, newT * 0.03125);
        }
        auxPos.z = -auxPos.z * escalaZ;
        //El techo no aparece hasta que se completo el edificio
        if ( scaleYTop < 0.0 && escalaZ != 1.0 ) auxPos = vec4(0.0, 0.0, 0.0, 1.0);

        // Transformamos al v�rtice al espacio de la c�mara
        vec4 pos_camera_view = uViewMatrix * uModelMatrix * vec4(auxPos.xyz, 1.0);
        vec3 pos = vec3(uModelMatrix * vec4(auxPos.xyz, 1.0));

        // Transformamos al v�rtice al espacio de la proyecci�n
        gl_Position = uPMatrix * pos_camera_view;

        // Coordenada de textura modificada
        vec2 auxUV = aTextureCoord;
        if (t > lim) auxUV.y = auxUV.y * escalaZ;
        vTextureCoord = auxUV;

        //Variables que se pasan al fragment para la iluminacion
        vVertexNormal = normalize(uNMatrix * aVertexNormal);
        vLightDir = normalize(uLightPosition - pos); //Direccion de la luz
        vViewDir = normalize(pos_camera_view.xyz); //Direccion de la vista

        // Transform normal and tangent to eye space
        vec3 norm = vVertexNormal;
        vec3 tang = normalize(uNMatrix * aVertexTangent);
        vec3 binormal = normalize(cross(norm, tang));

        //Matriz de transformacion al espacio tangencial
        mat3 tangMat = mat3(
            tang.x, binormal.x, norm.x,
            tang.y, binormal.y, norm.y,
            tang.z, binormal.z, norm.z
        );

        //Se transforman todos los vectores al espacio tangencial
        vLightDir = tangMat * vLightDir;
        vViewDir = tangMat * vViewDir;
        ////////////////////////////////////////////
    }
    `;

    return getRawVertexShader(vertexShaderSource);
}

function getBuildingRawFragmentShader(){
    var fragmentShaderSource = `
    precision highp float;

    // Variables utilizadas para la iluminación
    uniform vec3 uAmbientColor;
    uniform vec3 uSpecularColor;
    uniform vec3 uDirectionalColor;

    uniform float uShininess; //Brillo de un objeto

    varying vec2 vTextureCoord;
    varying vec3 vVertexNormal;
    varying vec3 vLightDir;
    varying vec3 vViewDir;

    //Texturas de pisos
    uniform sampler2D uTopSampler;
    //Texturas de planta baja
    uniform sampler2D uLowSampler;
    //Textura de techo
    uniform sampler2D uRoofSampler;
    //Mapa de normales
    uniform sampler2D uTopNormalSampler;
    uniform sampler2D uLowNormalSampler;

    uniform float x;
    uniform float y;
    uniform float scaleXTop;
    uniform float scaleYTop;
    uniform float scaleXLow;
    uniform float scaleYLow;

    void main(void) {
        vec4 textureColor;
        vec2 auxUV = vTextureCoord;
        auxUV.y = vTextureCoord.y * y; //escalado de textura base
        auxUV.x = vTextureCoord.x * x; //escalado de textura base

        vec3 normal = vVertexNormal;

        if (scaleYTop < 0.0){
            textureColor = texture2D(uRoofSampler,  vTextureCoord); //Solo es el techo
            normal = vec3(2.0 * texture2D(uTopNormalSampler, vTextureCoord) - 1.0);
        } else if (auxUV.y > 0.4){ //parte de arriba
            auxUV.y = auxUV.y - 0.4;
            auxUV.x = auxUV.x * scaleXTop;
            auxUV.y = auxUV.y * scaleYTop;
            textureColor = texture2D(uTopSampler, auxUV);
            //Se obtiene la normal del mapa de normales
            normal = vec3(2.0 * texture2D(uTopNormalSampler, auxUV) - 1.0);
        } else { //parte de abajo
            auxUV.x = auxUV.x * scaleXLow;
            auxUV.y = auxUV.y * 2.5 * scaleYLow;

            textureColor = texture2D(uLowSampler, auxUV);
            normal = vec3(2.0 * texture2D(uLowNormalSampler, auxUV) - 1.0);
        }

        float shininess = 1.0;
        //Se normaliza la direccion de la luz
        vec3 lightDir = normalize(vLightDir);
        vec3 viewDir = vViewDir;
        //Calculos de phong
        float specular = 0.0;
        float lambertian = max(dot(normal, lightDir), 0.0);
        if(lambertian > 0.0) {
            vec3 reflectDir = reflect(-lightDir, normal);
            float specAngle = max(dot(reflectDir, viewDir), 0.0);
            specular = pow(specAngle, shininess);
        }
        //Calculo total de la luz
        vec3 lightIntensity =  uAmbientColor + lambertian*uDirectionalColor*1.3 + specular*uDirectionalColor*0.15;

        gl_FragColor = vec4(textureColor.rgb * lightIntensity, 1.0);
    }
`;
    return getRawFragmentShader(fragmentShaderSource);
}

/**********************************CALLES**********************************************/

function getStreetRawVertexShader(){
    var vertexShaderSource = `
    attribute vec3 aVertexPosition;
    attribute vec3 aVertexNormal;
    attribute vec3 aVertexTangent;
    attribute vec2 aTextureCoord;

    uniform mat4 uViewMatrix;
    uniform mat4 uModelMatrix;
    uniform mat4 uPMatrix;
    uniform mat3 uNMatrix;

    uniform vec3 uLightPosition;
    uniform vec3 uSpotLightPos[23];

    varying vec2 vTextureCoord;
    varying vec3 vVertexNormal;
    varying vec3 vLightDir;
    varying vec3 vViewDir;
    varying vec3 vSpotLightDir;
    varying vec3 vSpotLightPos[23];

    void main(void) {
        // Transformamos al v�rtice al espacio de la c�mara
        vec4 pos_camera_view = uViewMatrix * uModelMatrix * vec4(aVertexPosition, 1.0);
        vec3 pos = vec3(uModelMatrix * vec4(aVertexPosition, 1.0));

        // Transformamos al v�rtice al espacio de la proyecci�n
        gl_Position = uPMatrix * pos_camera_view;
        // Coordenada de textura sin modifiaciones
        vTextureCoord = aTextureCoord;
        //Variables que se pasan al fragment para la iluminacion
        vVertexNormal = normalize(uNMatrix * aVertexNormal);
        vLightDir = normalize(uLightPosition - pos); //Direccion de la luz
        vViewDir = normalize(pos_camera_view.xyz); //Direccion de la vista
        //Para cada spotlight se calcula la posicion relativa y la direccion
        for (int i = 0; i < 23; i++){
            vSpotLightPos[i] = uSpotLightPos[i] - pos;
            vSpotLightDir = vec3(0.0, -1.0, 0.0);
        }

        // Transform normal and tangent to eye space
        vec3 norm = vVertexNormal;
        vec3 tang = normalize(uNMatrix * aVertexTangent);
        vec3 binormal = normalize(cross(norm, tang));

        //Matriz de transformacion al espacio tangencial
        mat3 tangMat = mat3(
            tang.x, binormal.x, norm.x,
            tang.y, binormal.y, norm.y,
            tang.z, binormal.z, norm.z
        );

        //Se transforman todos los vectores al espacio tangencial
        vLightDir = tangMat * vLightDir;
        vViewDir = tangMat * vViewDir;
        //Spotlights
        vSpotLightDir = tangMat * vSpotLightDir;
        for (int i = 0; i < 23; i++){
            vSpotLightPos[i] = tangMat * vSpotLightPos[i];
        }
    }
    `;

    return getRawVertexShader(vertexShaderSource);
}

function getStreetRawFragmentShader(){
    var fragmentShaderSource = `
    precision highp float;

    // Variables utilizadas para la iluminación
    uniform vec3 uAmbientColor;
    uniform vec3 uSpecularColor;
    uniform bool uUseSpot;
    uniform bool uSpotsOn;
    uniform vec3 uDirectionalColor;
    uniform vec3 uSpotLightColor;

    uniform float uShininess; //Brillo de un objeto

    varying vec2 vTextureCoord;
    varying vec3 vVertexNormal;
    varying vec3 vLightDir;
    varying vec3 vViewDir;
    varying vec3 vSpotLightPos[23];
    varying vec3 vSpotLightDir;

    uniform float scaleY; //Escala de la textura
    uniform float scaleX; //Escala de la textura
    uniform sampler2D uSampler;
    uniform sampler2D uNormalSampler;

    void main(void) {
        float shininess = uShininess;

        vec2 auxUV = vTextureCoord;
        auxUV.x = auxUV.x * scaleX;
        auxUV.y = auxUV.y * scaleY;

        //Se obtiene la normal del mapa de normales
        vec3 normal = vVertexNormal;
        normal = vec3(2.0 * texture2D(uNormalSampler, auxUV) - 1.0);

        //Se normaliza la direccion de la luz
        vec3 lightDir = normalize(vLightDir);
        vec3 viewDir = vViewDir;
        //Calculos de phong
        float specular = 0.0;
        float lambertian = max(dot(lightDir, normal), 0.0);
        if(lambertian > 0.0) {
            vec3 reflectDir = reflect(-lightDir, normal);
            float specAngle = max(dot(reflectDir, viewDir), 0.0);
            specular = pow(specAngle, shininess);
        }

        vec3 spotLightIntensity = vec3(0.0, 0.0, 0.0);
        if (uUseSpot && uSpotsOn){
            const float spotlightCutOff = 0.3; // en radianes
            const float spotLightExponent = 1.0;

            // Attenuation constants
            const float constantAtt = 0.8;
            const float linearAtt = 0.001;
            const float quadraticAtt = 0.08;

            // Calculos spotlights
            //Para cada spot se hace el calculo
            for (int i = 0; i < 23; i++){
                vec3 spotPos = vSpotLightPos[i];
                float diffuseLightWeighting = max(dot(normal, spotPos), 0.0);

                if (diffuseLightWeighting > 0.0) {
                    // Calculate attenuation
                    float dist = length(spotPos);
                    float att = 1.0/(constantAtt + linearAtt * dist + quadraticAtt * dist * dist);
                    float spotEffect = dot(normalize(vSpotLightDir), normalize(-spotPos));

                    if (spotEffect > spotlightCutOff) {
                        spotEffect = pow(spotEffect, spotLightExponent);
                        vec3 reflectionVector =	normalize(reflect(-spotPos,	normal));
                        float rdotv = max(dot(reflectionVector, vViewDir), 0.0);
                        float specularLightWeighting = pow(rdotv, shininess);
                        spotLightIntensity += spotEffect * att * (uSpotLightColor * diffuseLightWeighting + uSpotLightColor * specularLightWeighting);
                    }
                }
            }
        }
        //Calculo total de la luz
        vec3 lightIntensity = uAmbientColor + spotLightIntensity + lambertian*uDirectionalColor + specular*uSpecularColor;
        //Se obtiene el color del mapa difuso
        vec4 textureColor = texture2D(uSampler, auxUV);

        gl_FragColor = vec4(textureColor.rgb * lightIntensity, 1.0);
    }
`;
    return getRawFragmentShader(fragmentShaderSource);
}
