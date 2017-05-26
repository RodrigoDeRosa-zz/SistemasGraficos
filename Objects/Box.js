class Box extends Object3D{
    /**Forma de caja default ([x,y,z]=[1,1,1]).
     * @param {color} Color Objeto de clase Color
     * @param {texture} bool Flag que indica si lleva textura o no
    */
    constructor(color, texture, offset){
        super();

        var SWEPT_STEPS = 2;
        var SHAPE_POINTS = 8; //Un cuadrado con los extremos repetidos para facetado

        this.shape = new BoxShape();
        this.path = new StraightLine(SWEPT_STEPS, true, offset);

        this.surface = new SweptSurface(this.shape, this.path);

        this.setIndexCreator(new VertexGrid(SWEPT_STEPS, SHAPE_POINTS));
        this.setPosCreator(this.surface);
        this.setNormalCreator(this.surface);
        if (texture) this.setTextureCreator(this);
        else {
            if (!color) this.setColorCreator(new Gray(SWEPT_STEPS, SHAPE_POINTS));
            else this.setColorCreator(color);
        }
    }
    /**
     @Override
    */
    build(){
        this.posBuffer = this.posBufferCreator.setPosBuffer();
        this.normalBuffer = this.normalBufferCreator.setNormalBuffer();
        if (this.colorBufferCreator) this.colorBuffer = this.colorBufferCreator.setColorBuffer();
        /*La diferencia esta aca! necesito el pos buffer ya seteado*/
        if (this.textureBufferCreator){
            this.textureBuffer = this.setTextureBuffer();
        }
        this.indexBuffer = this.indexBufferCreator.setIndexBuffer();

        this.setUpWebGLBuffers();
    }
    /*Se usa esta funcion post build para definir la textura*/
    setTextureBuffer(w, h){
        var height, width0, width1;
        h ? height = h : height = 4.0;
        w ? width1 = w : width1 = 4.0;
        w ? width0 = w : width0 = 1/this.x;
        var buffer = [
            //Quiero repetir la textura en cada lado, asique los u se repiten para cada cara
            //Parte inferior, todos los v son 0
            0.0, 0.0,
            width0, 0.0,
            //cara
            0.0, 0.0,
            width1, 0.0,
            //cara
            0.0, 0.0,
            width0, 0.0,
            //cara
            0.0, 0.0,
            width1, 0.0,
            //Parte superior, todo los v son 1
            0.0, height,
            width0, height,
            //cara
            0.0, height,
            width1, height,
            //cara
            0.0, height,
            width0, height,
            //cara
            0.0, height,
            width1, height
        ];
        return buffer;
    }
}
