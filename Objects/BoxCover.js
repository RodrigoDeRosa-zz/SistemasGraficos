class BoxCover extends Object3D{
    /**Techo de un edificio.*/
    constructor(color){
        super();

        this.setIndexCreator(this); //Es un cuadrado.
        this.setPosCreator(this);
        this.setNormalCreator(this);
        if (!color) this.setColorCreator(new Gray(2, 2));
        else this.setColorCreator(color);
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
}
