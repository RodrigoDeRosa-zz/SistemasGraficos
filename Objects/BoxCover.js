class BoxCover extends Object3D{
    /**Techo de un edificio.*/
    constructor(color, texture){
        super();

        this.setIndexCreator(this); //Es un cuadrado.
        this.setPosCreator(this);
        this.setNormalCreator(this);
        if (texture) this.setTextureCreator(this);
        else{
            if (!color) this.setColorCreator(new Gray(2, 2));
            else this.setColorCreator(color);
        }
        this.x = 1.0;
        this.y = 1.0;
    }
    /*Es un cuadrado en el XY.*/
    setPosBuffer(){
        var buffer = [
            -0.5, -0.5, 0,
            0.5, -0.5, 0,
            0.5, 0.5, 0,
            -0.5, 0.5, 0
        ];
        return buffer;
    }
    /*Todas las normales van salientes.*/
    setNormalBuffer(){
        var buffer = [
            0, 1, 0,
            0, 1, 0,
            0, 1, 0,
            0, 1, 0
        ];
        return buffer;
    }
    setIndexBuffer(){
        return [0, 1, 2, 3, 0];
    }
    setTextureBuffer(){
        return [
            0.0, 0.0,
            1.0, 0.0,
            0.0, 1.0,
            1.0, 1.0
        ];
    }
}
