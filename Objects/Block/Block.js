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

class CentralBlock extends Block{
    /**Manzana en el eje z.
    * @param {type} integer Indica si tiene parque o edificios
    * @param {side} integer Indica si esta en los z positivos o negativos
    */
    constructor(shader, type, side){
        super(shader);

        if (type == BLOCK_PARK) this.block = new ParkBlock(shader);
        else this.block = new BuildingBlock(shader);
        //No tiene calles

        this.addChildren();
    }
}

class zAxisBlock extends Block{
    /**Manzana en el eje z.
      * @param {type} integer Indica si tiene parque o edificios
      * @param {side} integer Indica si esta en los z positivos o negativos
    */
    constructor(shader, streetShader, type, side){
        super(shader);

        if (type == BLOCK_PARK) this.block = new ParkBlock(shader);
        else this.block = new BuildingBlock(shader);
        /*Solo tiene una calle, que depende si z>0 o z<0*/
        if (side > 0) this.streets.push(new Street(streetShader, STREET_TOP));
        else this.streets.push(new Street(streetShader, STREET_BOTTOM));

        this.addChildren();
    }
}

class xAxisBlock extends Block{
    /**Manzana en el eje x.
      * @param {type} integer Indica si tiene parque o edificios
      * @param {side} integer Indica si esta en los z positivos o negativos
    */
    constructor(shader, streetShader, type, side){
        super(shader);

        if (type == BLOCK_PARK) this.block = new ParkBlock(shader);
        else this.block = new BuildingBlock(shader);
        /*Solo tiene una calle, que depende si x>0 o x<0*/
        if (side > 0) this.streets.push(new Street(streetShader, STREET_LEFT));
        else this.streets.push(new Street(streetShader, STREET_RIGHT));

        this.addChildren();
    }
}

class firstQuadrantBlock extends Block{
    /**Manzana en el primer cuadrante.
      * @param {type} integer Indica si tiene parque o edificios
    */
    constructor(shader, streetShader, type){
        super(shader);

        if (type == BLOCK_PARK) this.block = new ParkBlock(shader);
        else this.block = new BuildingBlock(shader);
        /*Tiene dos calles y una esquina*/
        this.streets.push(new Street(streetShader, STREET_LEFT));
        this.streets.push(new Street(streetShader, STREET_TOP));
        this.streets.push(new Crossroad(streetShader, CROSS_TOP_LEFT));

        this.addChildren();
    }
}

class secondQuadrantBlock extends Block{
    /**Manzana en el segundo cuadrante.
      * @param {type} integer Indica si tiene parque o edificios
    */
    constructor(shader, streetShader, type){
        super(shader);

        if (type == BLOCK_PARK) this.block = new ParkBlock(shader);
        else this.block = new BuildingBlock(shader);
        /*Tiene dos calles y una esquina*/
        this.streets.push(new Street(streetShader, STREET_RIGHT));
        this.streets.push(new Street(streetShader, STREET_TOP));
        this.streets.push(new Crossroad(streetShader, CROSS_TOP_RIGHT));

        this.addChildren();
    }
}

class thirdQuadrantBlock extends Block{
    /**Manzana en el tercer cuadrante.
      * @param {type} integer Indica si tiene parque o edificios
    */
    constructor(shader, streetShader, type){
        super(shader);

        if (type == BLOCK_PARK) this.block = new ParkBlock(shader);
        else this.block = new BuildingBlock(shader);
        /*Tiene dos calles y una esquina*/
        this.streets.push(new Street(streetShader, STREET_RIGHT));
        this.streets.push(new Street(streetShader, STREET_BOTTOM));
        this.streets.push(new Crossroad(streetShader, CROSS_BOTTOM_RIGHT));

        this.addChildren();
    }
}

class fourthQuadrantBlock extends Block{
    /**Manzana en el cuarto cuadrante.
      * @param {type} integer Indica si tiene parque o edificios
    */
    constructor(shader, streetShader, type){
        super(shader);

        if (type == BLOCK_PARK) this.block = new ParkBlock(shader);
        else this.block = new BuildingBlock(shader);
        /*Tiene dos calles y una esquina*/
        this.streets.push(new Street(streetShader, STREET_LEFT));
        this.streets.push(new Street(streetShader, STREET_BOTTOM));
        this.streets.push(new Crossroad(streetShader, CROSS_BOTTOM_LEFT));

        this.addChildren();
    }
}
