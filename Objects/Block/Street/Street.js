class Street extends Box{
    /**Calle entre dos esquinas
      * @param {position} integer Posicion en la que va la calle relativa a una manzana
    */
    constructor(shader, position){
        super(null, true);
        this.street = true;
        this.id = 0.0;

        this.translateStreet(position);
        this.scale(0.2, 0.01, 1.2);

        this.setShaderProgram(shader);
        this.build();
    }
    /*Traslada la calle dependiendo la posicion pedida*/
    translateStreet(position){
        switch (position) {
            case STREET_RIGHT:
                this.translate(0.7, -0.015, 0); break;
            case STREET_LEFT:
                this.translate(-0.7, -0.015, 0); break;
            case STREET_TOP:
                this.translate(0, -0.015, -0.7);
                this.rotate(Math.PI/2, 0, 1, 0);
                break;
            case STREET_BOTTOM:
                this.translate(0, -0.015, 0.7);
                this.rotate(Math.PI/2, 0, 1, 0);
                break;
            default:
                alert("Street position not defined!");
        }
    }
    /**
     @Override
    */
    build(){
        this.posBuffer = this.posBufferCreator.setPosBuffer();
        this.normalBuffer = this.normalBufferCreator.setNormalBuffer();
        if (this.colorBufferCreator) this.colorBuffer = this.colorBufferCreator.setColorBuffer();
        /*La diferencia esta aca! necesito el pos buffer ya seteado y que ancho y alto sean 1*/
        if (this.textureBufferCreator){
            this.textureBuffer = this.setTextureBuffer(1, 1);
        }
        this.indexBuffer = this.indexBufferCreator.setIndexBuffer();

        this.setUpWebGLBuffers();
    }
}
