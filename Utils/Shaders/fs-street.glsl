precision highp float;

// Variables utilizadas para la iluminación
uniform vec3 uAmbientColor;
uniform vec3 uSpecularColor;
uniform bool uUseSpot;
uniform vec3 uDirectionalColor;
uniform vec3 uSpotLightColor[2];

uniform float uShininess; //Brillo de un objeto

varying vec2 vTextureCoord;
varying vec3 vVertexNormal;
varying vec3 vLightDir;
varying vec3 vViewDir;
varying vec3 vSpotLightPos[2];
varying vec3 vSpotLightDir[2];

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
    if (uUseSpot){
        const float spotlightCutOff = 0.7; // en radianes
        const float spotLightExponent = 2.0;

        // Attenuation constants
        const float constantAtt = 1.0;
        const float linearAtt = 0.0001;
        const float quadraticAtt = 0.01;

        // Calculos spotlights
        //Para cada spot se hace el calculo
        for (int i = 0; i < 2; i++){
            vec3 spotPos = vSpotLightPos[i];
            float diffuseLightWeighting = max(dot(normal, spotPos), 0.0);

            if (diffuseLightWeighting > 0.0) {
                // Calculate attenuation
                float dist = length(spotPos);
                float att = 1.0/(constantAtt + linearAtt * dist + quadraticAtt * dist * dist);
                float spotEffect = dot(normalize(vSpotLightDir[i]), normalize(-spotPos));

                if (spotEffect > spotlightCutOff) {
                    spotEffect = pow(spotEffect, spotLightExponent);
                    vec3 reflectionVector =	normalize(reflect(-spotPos,	normal));
                    float rdotv = max(dot(reflectionVector, vViewDir), 0.0);
                    float specularLightWeighting = pow(rdotv, shininess);
                    spotLightIntensity += spotEffect * att * (uSpotLightColor[i] * diffuseLightWeighting + uSpotLightColor[i] * specularLightWeighting);
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
