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

    if (auxUV.y > 0.4){
        auxUV.y = auxUV.y - 0.4;
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
        auxUV.x = auxUV.x * 2.5;
        auxUV.y = auxUV.y * 2.5;
        if (vID == 0.0){
            auxUV.x = auxUV.x * 0.5;
            textureColor = texture2D(sLow1, auxUV);
        } else if (vID == 1.0){
            auxUV.x = auxUV.x * 0.5;
            textureColor = texture2D(sLow2,  auxUV);
        } else if (vID == 2.0){
            textureColor = texture2D(sLow3,  auxUV);
        } else if (vID == 3.0){
            auxUV.x = auxUV.x * 0.25;
            textureColor = texture2D(sLow4,  auxUV);
        } else if (vID == 4.0){
            textureColor = texture2D(sLow5,  auxUV);
        } else if (vID == 5.0){
            auxUV.x = auxUV.x * 0.5;
            textureColor = texture2D(sLow6,  auxUV);
        } else if (vID == 6.0 || vID == 7.0){
            auxUV.x = auxUV.x * 0.5;
            textureColor = texture2D(sLow7,  auxUV);
        }
    }
    if (vID == 20.0) textureColor = texture2D(sRoof,  vec2(vTextureCoord.s, vTextureCoord.t));

    gl_FragColor = vec4(textureColor.rgb * vLightWeighting, textureColor.a);
}
