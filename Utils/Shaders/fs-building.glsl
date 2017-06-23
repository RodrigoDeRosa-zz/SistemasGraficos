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
    vec3 lightIntensity =  uAmbientColor + lambertian*uDirectionalColor + specular*uDirectionalColor*0.3;

    gl_FragColor = vec4(textureColor.rgb * lightIntensity, 1.0);
}
