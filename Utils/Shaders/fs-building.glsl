precision highp float;

varying vec2 vTextureCoord;
varying vec3 vLightWeighting;

uniform sampler2D sTop1;
uniform sampler2D sTop2;
uniform sampler2D sTop3;

varying float vID;

void main(void) {
    vec4 textureColor;

    if (vID == 0.0) textureColor = texture2D(sTop1, vec2(vTextureCoord.s, vTextureCoord.t));
    else if (vID == 1.0) textureColor = texture2D(sTop2, vec2(vTextureCoord.s, vTextureCoord.t));
    else if (vID == 2.0) textureColor = texture2D(sTop3, vec2(vTextureCoord.s, vTextureCoord.t));

    gl_FragColor = vec4(textureColor.rgb * vLightWeighting, textureColor.a);
}
