class Block extends Container3D{
    /*Manzana de la grilla de la ciudad.*/
    constructor(shader){
        super();
        this.block = null;
        this.streets = [];
        this.setShaderProgram(shader);
    }
    /*Agrega a todos los objetos de la manzana*/
    addChildren(){
        this.addChild(this.block);
        for (var i = 0; i < this.streets.length; i++){
            this.addChild(this.streets[i]);
        }
    }
}

class zAxisBlock extends Block{
    /**Manzana en el eje z.
      * @param {type} integer Indica si tiene parque o edificios
      * @param {side} integer Indica si esta en los z positivos o negativos
    */
    constructor(shader, type, side){
        super(shader);

        if (type == BLOCK_PARK) this.block = new ParkBlock(shader);
        else this.block = new BuildingBlock(shader);
        /*Solo tiene una calle, que depende si z>0 o z<0*/
        if (side > 0) this.streets.push(new Street(shader, STREET_LEFT));
        else this.streets.push(new Street(shader, STREET_RIGHT));

        this.addChildren();
    }
}
