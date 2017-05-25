precision highp float;

varying vec2 vTextureCoord;
varying vec3 vLightWeighting;

uniform sampler2D streetTex;
uniform sampler2D crossTex;
uniform sampler2D sidewalkTex;

varying float vID;

void main(void) {
    vec4 textureColor;

    if (vID == 0.0) textureColor = texture2D(streetTex, vec2(vTextureCoord.s, vTextureCoord.t));
    else if (vID == 1.0) textureColor = texture2D(crossTex, vec2(vTextureCoord.s, vTextureCoord.t));
    else if (vID == 2.0) textureColor = texture2D(sidewalkTex, vec2(vTextureCoord.s, vTextureCoord.t));

    gl_FragColor = vec4(textureColor.rgb * vLightWeighting, textureColor.a);
}
