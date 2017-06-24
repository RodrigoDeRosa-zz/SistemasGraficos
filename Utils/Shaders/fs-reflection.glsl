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
uniform samplerCube uReflectionMap;
uniform sampler2D uSampler;

void main(void) {
    vec3 normal = vVertexNormal;

    float shininess = uShininess;
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
    //Reflexion
    vec4 reflectionColor = vec4(0.0,0.0,0.0,1.0);
    float reflectionFactor = 1.0;
    //Se calcula el rayo reflejado
    vec3 reflection = -reflect(viewDir, normal);
    reflectionColor = textureCube(uReflectionMap, normalize(reflection));
    reflectionColor = reflectionColor * reflectionFactor;

    vec4 textureColor = texture2D(uSampler, vTextureCoord);
    vec4 color = textureColor + reflectionColor;

    //Calculo total de la luz
    vec3 lightIntensity =  uAmbientColor + lambertian*uDirectionalColor + specular*uDirectionalColor;

    gl_FragColor = vec4(color.rgb * lightIntensity, color.a);
}
