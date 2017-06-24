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
