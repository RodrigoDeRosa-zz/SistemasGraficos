class Crossroad extends Box{
    /**Esquina de una manzana
      * @param {position} integer Posicion en la que va la esquina relativa a la manzana
    */
    constructor(shader, position){
        super(new DarkGray(2, 8));

        this.translateCrossroad(position);
        this.scale(0.2, 0.01, 0.2);

        this.setShaderProgram(shader);
        this.build();
    }
    /*Traslada la esquina dependiendo la posicion pedida*/
    translateCrossroad(position){
        switch (position) {
            case CROSS_TOP_RIGHT:
                this.translate(0.7, -0.015, -0.7); break;
            case CROSS_TOP_LEFT:
                this.translate(-0.7, -0.015, -0.7); break;
            case CROSS_BOTTOM_RIGHT:
                this.translate(0.7, -0.015, 0.7); break;
            case CROSS_BOTTOM_LEFT:
                this.translate(-0.7, -0.015, 0.7); break;
            default:
                alert("Crossroad position not defined!");
        }
    }
}
