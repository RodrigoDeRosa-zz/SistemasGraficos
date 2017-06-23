precision highp float;
varying vec2 vTextureCoord;
varying vec3 vLightWeighting;

uniform sampler2D uSampler;

void main(void){
    vec2 auxUV = vTextureCoord;
    auxUV.x = auxUV.x * 0.5;
    vec4 textureColor = texture2D(uSampler, auxUV);
    gl_FragColor = vec4(textureColor.rgb * vLightWeighting, textureColor.a);
}
