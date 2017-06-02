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

varying vec3 vLightWeighting;

varying vec3 vLightDir;
varying vec3 vDirectionalColor;
//Se pasan por separado los elementos para calcular en el fragment
varying vec3 vDiffuse;
varying vec3 vAmbient;
varying vec3 vSpecular;
//
varying vec2 vTextureCoord;
varying float vID;

void main(void) {

    // Transformamos al v�rtice al espacio de la c�mara
    vec4 pos_camera_view = uViewMatrix * uModelMatrix * vec4(aVertexPosition, 1.0);
    vec4 pos_world = uModelMatrix * vec4(aVertexPosition, 1.0);

    // Transformamos al v�rtice al espacio de la proyecci�n
    gl_Position = uPMatrix * pos_camera_view;
    //Se pasa el id del objeto
    vID = aID;
    // Coordenada de textura sin modifiaciones
    vTextureCoord = aTextureCoord;

    ////////////////////////////////////////////
    // Calculos de la iluminaci�n
    vec3 light_dir =  uLightPosition - vec3( pos_world );
    normalize(light_dir);
    if (!uUseLighting) {
        vLightWeighting = vec3(1.0, 1.0, 1.0);
    } else{
        //Se pasan estos valores en caso de tener mapa de normales
        vLightDir = light_dir;
        vDirectionalColor = uDirectionalColor;

        float Ka = 1.0; //Ambient reflection
        float Kd = 0.80; //Diffuse reflection
        float Ks = 0.008; //Specular reflection
        //LAMBERT, diffuse
        vec3 transformedNormal = normalize(uNMatrix * aVertexNormal);
        float directionalLightWeighting = max(dot(transformedNormal, light_dir), 0.0); //lambertian
        //Specular
        float shininessVal = 1.0;
        float specular = 0.0;
        if (directionalLightWeighting > 0.0){
            vec3 R = reflect(-light_dir, transformedNormal);
            vec3 V = normalize(vec3(uPMatrix * pos_camera_view));

            float specAngle = max(dot(R, V), 0.0);
            specular = pow(specAngle, shininessVal); //SHININESS ARBITRARIO
        }
        vec3 specularColor = vec3(0.04, 0.04, 0.04); //ARBITRARIO
        /*Se pasan por separado*/
        vAmbient = Ka * uAmbientColor;
        vDiffuse = Kd * uDirectionalColor * directionalLightWeighting;
        vSpecular = specular * specularColor * Ks;
    }
}
