class Sky extends Object3D{
    /*Esfera usada como skyball*/
    constructor(){
        super();
        this.useLight = false;

        this.longitudinalBands = 60;
        this.latitudinalBands = 60;

        this.setIndexCreator(new VertexGrid(this.latitudinalBands, this.longitudinalBands));
        this.setPosCreator(this);
        this.setTextureCreator(this);

        this.setShaderProgram(skyShader);
        this.build();
        this.sky = true;
    }
    setPosBuffer(){
        var theta = (2*Math.PI)/(this.longitudinalBands-1);
        var phi = (Math.PI)/(this.latitudinalBands-1);
        var x, y, z;
        var buffer = [];
        for (var i = 0; i < this.latitudinalBands; i++){
            for (var j = 0; j < this.longitudinalBands; j++){
                x = Math.cos(theta*j)*Math.sin(phi*i);
                y = Math.cos(phi*i);
                z = Math.sin(theta*j)*Math.sin(phi*i);
                buffer.push(x);
                buffer.push(y);
                buffer.push(z);
            }
        }
        return buffer;
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
