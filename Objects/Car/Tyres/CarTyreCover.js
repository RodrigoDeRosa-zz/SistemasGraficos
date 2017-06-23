class CarTyreCover extends Object3D{
    /*Forma de la parte inferior de un auto*/
    constructor(color, side, levels){
        super();

        this.levels = levels;
        this.side = side;
        this.setIndexCreator(this);
        this.setPosCreator(this);
        this.setNormalCreator(this);
        this.setTangentCreator(this);
        this.setTextureCreator(this);

        this.id = 7;
        this.street = true;
    }
    setPosBuffer(){
        var buffer = [];
        var theta = 2*Math.PI/(this.levels-1);
        for (var i = 0.0; i < this.levels; i++){
            var x = 0.073*Math.cos(theta*i);
            var y = 0.073*Math.sin(theta*i);
            var z = 0;
            buffer.push(x);
            buffer.push(y);
            buffer.push(z);
        }
        return buffer;
    }
    setNormalBuffer(){
        var buffer = [];
        for (var i = 0; i < this.levels; i++){
            buffer.push(0);
            buffer.push(0);
            buffer.push(this.side);
        }
        return buffer;
    }
    setTangentBuffer(){
        var buffer = [];
        var theta = 2*Math.PI/(this.levels-1);
        for (var i = 0.0; i < this.levels; i++){
            var x = -0.073*Math.sin(theta*i);
            var y = 0.073*Math.cos(theta*i);
            var z = 0;
            buffer.push(x);
            buffer.push(y);
            buffer.push(z);
        }
        return buffer;
    }
    setIndexBuffer(){
        var buffer = [];
        buffer.push(0);
        for (var i = 1; i < this.levels; i++){
            buffer.push(7);
            buffer.push(i);
            buffer.push(i);
        }
        buffer.push(0);
        return buffer;
    }
    setTextureBuffer(){
        var buffer = [];
        var theta = 2*Math.PI/(this.levels-1);
        for (var i = 0.0; i < this.levels; i++){
            var u = 0.0865*Math.cos(theta*i) + 0.1765;
            var v = 0.0865*Math.sin(theta*i) + 0.155;
            buffer.push(u);
            buffer.push(v);
        }
        return buffer;
    }
}
