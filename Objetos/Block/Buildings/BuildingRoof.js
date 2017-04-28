class BuildingRoof extends Object3D{
    /**Techo de un edificio.*/
    constructor(){
        super();

        this.setIndexCreator(this); //Es un cuadrado.
        this.setPosCreator(this);
        this.setNormalCreator(this);
        this.setColorCreator(new Gray(2, 2));
    }
    /*Es un cuadrado en el XZ.*/
    setPosBuffer(){
        var buffer = [
            -0.5, 0.5, -0.5,
            0.5, 0.5, -0.5,
            0.5, 0.5, 0.5,
            -0.5, 0.5, 0.5
        ];
        return buffer;
    }
    /*Todas las normales van para salientes.*/
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
