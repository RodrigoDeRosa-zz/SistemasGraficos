class MetallicSphere extends Object3D{
    /*Esfera usada como skyball*/
    constructor(){
        super();

        this.longitudinalBands = 60;
        this.latitudinalBands = 60;

        this.shape = new HalfCircleShape(this.longitudinalBands);

        this.surface = new RevoltSurface(this.shape, this.latitudinalBands, [1, 0, 0]);

        this.setIndexCreator(new VertexGrid(this.latitudinalBands, this.longitudinalBands));
        this.setPosCreator(this.surface);
        this.setNormalCreator(this.surface);
        this.setTangentCreator(this.surface);
        this.setTextureCreator(this);

        this.setShaderProgram(reflectionShader);
        this.build();
        this.metallic = true;
    }
    setTextureBuffer(){
        var u, v;
        var buffer = [];
        for (var i = 0; i < this.latitudinalBands; i++){
            v = 1 - i/(this.latitudinalBands-1);
            for (var j = 0; j < this.longitudinalBands; j++){
                u = 1 -j/(this.longitudinalBands-1);
                buffer.push(u);
                buffer.push(v);
            }
        }
        return buffer;
    }
}
