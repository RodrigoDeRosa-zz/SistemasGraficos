class CarRoof extends Object3D{
    /*Parte inferior del auto*/
    constructor(color, shader){
        super();

        var SWEPT_LEVELS = 2;
        var SHAPE_POINTS = 8;

        this.shape = new CarRoofShape(SHAPE_POINTS);
        this.path = new StraightLine(SWEPT_LEVELS);

        this.surface = new SweptSurface(this.shape, this.path);

        this.setIndexCreator(new VertexGrid(SWEPT_LEVELS, SHAPE_POINTS));
        this.setPosCreator(this.surface);
        this.setNormalCreator(this.surface);
        this.setTextureCreator(this);

        var coverC = new Blue(2, 2);
        var cover1 = new CarRoofCover(coverC, -1);
        cover1.setShaderProgram(shader);
        cover1.build();
        cover1.translate(0, 0, 0.5);
        cover1.rotate(-Math.PI/2, 0, 0, 1);
        cover1.rotate(Math.PI, 0, 1, 0);
        this.addChild(cover1);

        var cover2 = new CarRoofCover(coverC, 1);
        cover2.setShaderProgram(shader);
        cover2.build();
        cover2.translate(0, 0, -0.5);
        cover2.rotate(-Math.PI/2, 0, 0, 1);
        cover2.rotate(Math.PI, 0, 1, 0);
        this.addChild(cover2);

        this.id = 7;
        this.street = true;
    }
    setTextureBuffer(){
        return [
            0.3, 0.64,
            0.74, 0.63,
            0.74, 0.63,
            0.65, 0.63,
            0.65, 0.63,
            0.39, 0.63,
            0.39, 0.63,
            0.3, 0.64,
            ////////////
            0.3, 0.97,
            0.74, 0.97,
            0.74, 0.97,
            0.65, 0.97,
            0.65, 0.97,
            0.39, 0.94,
            0.39, 0.94,
            0.3, 0.97
        ]
    }
}
