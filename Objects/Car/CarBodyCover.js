class CarBodyCover extends Object3D{
    /*Forma de la parte inferior de un auto*/
    constructor(color, side){
        super();

        this.side = side;
        this.setIndexCreator(this);
        this.setPosCreator(this);
        this.setNormalCreator(this);
        if (!color) this.setColorCreator(new Gray(2, 3));
        else this.setColorCreator(color);
    }
    setPosBuffer(){
        var bottomLeft = new Point(-0.5, 0, 0);
        var bottomRight = new Point(0.5, 0, 0);
        var topExteriorRight = new Point(0.5, 0.15, 0);
        var topInteriorRight = new Point(0.15, 0.2, 0);
        var topInteriorLeft = new Point(-0.35, 0.2, 0);
        var topExteriorLeft = new Point(-0.5, 0.15, 0);
        /*Se repiten por el facetado*/
        return [
            bottomLeft.x, bottomLeft.y, bottomLeft.z,
            bottomRight.x, bottomRight.y, bottomRight.z,
            topExteriorRight.x, topExteriorRight.y, topExteriorRight.z,
            topInteriorRight.x, topInteriorRight.y, topInteriorRight.z,
            topInteriorLeft.x, topInteriorLeft.y, topInteriorLeft.z,
            topExteriorLeft.x, topExteriorLeft.y, topExteriorLeft.z
        ];
    }
    setNormalBuffer(){
        /*Se repiten por el facetado*/
        return [
            0, 0, this.side,
            0, 0, this.side,
            0, 0, this.side,
            0, 0, this.side,
            0, 0, this.side,
            0, 0, this.side
        ];
    }
    setIndexBuffer(){
        return [0, 1, 2, 0, 2, 3, 0, 3, 4, 0, 4, 5];
    }
}
