class Box extends Object3D{
    /**Forma de caja default ([x,y,z]=[1,1,1]).
     * @param {color} Color Objeto de clase Color
     * @param {texture} bool Flag que indica si lleva textura o no
    */
    constructor(color, texture){
        super();

        var SWEPT_STEPS = 2;
        var SHAPE_POINTS = 8; //Un cuadrado con los extremos repetidos para facetado

        this.shape = new BoxShape();
        this.path = new StraightLine(SWEPT_STEPS);

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
    setTextureBuffer(width, height){
        /*El ancho máximo sera la posicion de un vertice en x.
          Dado que es una caja con el centro en 0 agarro el primer vertice (que en el caso
          mas ancho es 0.5 y lo multiplico por dos, pues en dicho caso valdría u 1)
          El escalado en z es siempre igual, por lo tanto debe haber otra escala para
          los costados.
         */
        var width0, width1;
        width ? width0 = width : width0 = Math.abs(this.posBuffer[0]);
        width ? width1 = width : width1 = Math.abs(this.posBuffer[1]);
        /*La altura maxima sera la altura de un vertice del segundo nivel del barrido*/
        var maxHeight;
        height ? maxHeight = height : maxHeight = Math.abs(this.posBuffer[26]); //El z del 9no vertice
        var buffer = [
            //Quiero repetir la textura en cada lado, asique los u se repiten para cada cara
            //Parte superior, todo los v son 1
            0.0, maxHeight,
            width0, maxHeight,
            //cara
            0.0, maxHeight,
            width1, maxHeight,
            //cara
            0.0, maxHeight,
            width0, maxHeight,
            //cara
            0.0, maxHeight,
            width1, maxHeight,
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
            width1, 0.0
        ];
        return buffer;
    }
}
