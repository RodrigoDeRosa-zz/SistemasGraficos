precision highp float;

varying vec3 vLightWeighting;
//Estas variables se usan para cambiar la iluminacion en caso de mapa de normales
varying vec3 vLightDir;
varying vec3 vDirectionalColor;
varying vec3 vDiffuse;
varying vec3 vAmbient;
varying vec3 vSpecular;
//
varying vec2 vTextureCoord;
varying float vID;

uniform sampler2D streetTex;
uniform sampler2D streetNormal;
uniform sampler2D crossTex;
uniform sampler2D crossNormal;
uniform sampler2D sidewalkTex;
uniform sampler2D sidewalkNorm;
uniform sampler2D grassTex;
uniform sampler2D grassNormal;
uniform sampler2D concreteTex;
uniform sampler2D concreteNorm;
uniform sampler2D asphaltTex;
uniform sampler2D asphaltNormal;
uniform sampler2D lightTex;
uniform sampler2D lightNormal;

void main(void) {
    vec4 textureColor;

    vec3 diffuse = vDiffuse;
    vec3 specular = vSpecular;
    vec3 ambient = vAmbient;
    float L;
    vec3 normalMap;

    if (vID == 0.0) {
        vec3 normalMap = texture2D(streetNormal, vTextureCoord).rgb * 2.0 - 1.0;
        textureColor = texture2D(streetTex, vTextureCoord);
    }else if (vID == 1.0){
        vec3 normalMap = texture2D(crossNormal, vTextureCoord).rgb * 2.0 - 1.0;
        textureColor = texture2D(crossTex, vTextureCoord);
    } else if (vID == 2.0){
        //Se repite mas veces la vereda
        vec2 auxUV = vTextureCoord;
        auxUV.x = auxUV.x * 4.0;
        auxUV.y = auxUV.y * 4.0;

        //sample the normal map
        //and convert to range -1.0 to 1.0
        normalMap = texture2D(sidewalkNorm, auxUV).rgb * 2.0 - 1.0;

        textureColor = texture2D(sidewalkTex, auxUV);
    } else if (vID == 3.0){
        //Se repite mas veces el pasto
        vec2 auxUV = vTextureCoord;
        auxUV.x = auxUV.x * 4.0;
        auxUV.y = auxUV.y * 4.0;
        normalMap = texture2D(grassNormal, auxUV).rgb * 2.0 - 1.0;
        textureColor = texture2D(grassTex, auxUV);
    }
    else if (vID == 4.0){
        normalMap = texture2D(concreteNorm, vTextureCoord).rgb * 2.0 - 1.0;;
        textureColor = texture2D(concreteTex, vTextureCoord);
    } else if (vID == 5.0){
        normalMap = texture2D(asphaltNormal, vTextureCoord).rgb * 2.0 - 1.0;
        textureColor = texture2D(asphaltTex, vTextureCoord);
    } else if (vID == 6.0){
        normalMap = texture2D(lightNormal, vTextureCoord).rgb * 2.0 - 1.0;
        textureColor = texture2D(lightTex, vTextureCoord);
    }

    L = max(dot(normalMap, vLightDir), 0.0); //lambertian
    diffuse = 0.80 * vDirectionalColor * L;

    vec3 light = diffuse + specular + ambient;
    gl_FragColor = vec4(textureColor.rgb * light, textureColor.a);
}
