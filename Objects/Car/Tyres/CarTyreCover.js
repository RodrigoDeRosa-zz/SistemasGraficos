class CarTyreCover extends Object3D{
    /*Forma de la parte inferior de un auto*/
    constructor(color, side, levels){
        super();

        this.levels = levels;
        this.side = side;
        this.setIndexCreator(this);
        this.setPosCreator(this);
        this.setNormalCreator(this);
        if (!color) this.setColorCreator(new DarkGray(3, 3));
        else this.setColorCreator(color);
    }
    setPosBuffer(){
        var buffer = [];
        var theta = 2*Math.PI/(this.levels-1);
        for (var i = 0.0; i < this.levels; i++){
            var x = 0.1*Math.cos(theta*i);
            var y = 0.1*Math.sin(theta*i);
            var z = 0;
            buffer.push(x);
            buffer.push(y);
            buffer.push(z);
        }
        return buffer;
    }
    setNormalBuffer(){
        /*Se repiten por el facetado*/
        var buffer = [];
        for (var i = 0; i < this.levels; i++){
            buffer.push(0);
            buffer.push(0);
            buffer.push(this.side);
        }
        return buffer;
    }
    setIndexBuffer(){
        return [0, 5, 1, 1, 5, 2, 2, 5, 3, 3, 5, 4, 1, 5, 6, 6, 5, 7, 7, 5, 8, 8, 5, 0];
    }
}
