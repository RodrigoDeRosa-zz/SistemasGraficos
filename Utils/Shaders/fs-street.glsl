precision highp float;

varying vec2 vTextureCoord;
varying vec3 vLightWeighting;

uniform sampler2D streetTex;
uniform sampler2D crossTex;
uniform sampler2D sidewalkTex;
uniform sampler2D grassTex;
uniform sampler2D concreteTex;
uniform sampler2D asphaltTex;
uniform sampler2D lightTex;

varying float vID;

void main(void) {
    vec4 textureColor;

    if (vID == 0.0) textureColor = texture2D(streetTex, vec2(vTextureCoord.s, vTextureCoord.t));
    else if (vID == 1.0) textureColor = texture2D(crossTex, vec2(vTextureCoord.s, vTextureCoord.t));
    else if (vID == 2.0) textureColor = texture2D(sidewalkTex, vec2(vTextureCoord.s, vTextureCoord.t));
    else if (vID == 3.0){
        //Se repite mas veces el pasto
        vec2 auxUV = vTextureCoord;
        auxUV.x = auxUV.x * 4.0;
        auxUV.y = auxUV.y * 4.0;
        textureColor = texture2D(grassTex, auxUV);
    }
    else if (vID == 4.0) textureColor = texture2D(concreteTex, vec2(vTextureCoord.s, vTextureCoord.t));
    else if (vID == 5.0) textureColor = texture2D(asphaltTex, vec2(vTextureCoord.s, vTextureCoord.t));
    else if (vID == 6.0){
        textureColor = texture2D(lightTex, vec2(vTextureCoord.s, vTextureCoord.t));
    }

    gl_FragColor = vec4(textureColor.rgb * vLightWeighting, textureColor.a);
}
