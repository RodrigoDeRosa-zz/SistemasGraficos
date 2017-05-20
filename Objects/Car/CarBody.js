class CarBody extends Object3D{
    /*Parte inferior del auto*/
    constructor(color, shader){
        super();

        var SWEPT_LEVELS = 2;
        var SHAPE_POINTS = 12;

        this.shape = new CarBodyShape(SHAPE_POINTS);
        this.path = new StraightLine(SWEPT_LEVELS);

        this.surface = new SweptSurface(this.shape, this.path);

        this.setIndexCreator(new VertexGrid(SWEPT_LEVELS, SHAPE_POINTS));
        this.setPosCreator(this.surface);
        this.setNormalCreator(this.surface);
        if (!color) this.setColorCreator(new Gray(SWEPT_LEVELS, SHAPE_POINTS));
        else this.setColorCreator(color);

        var cover1 = new CarBodyCover(new Blue(2, 3), -1);
        cover1.setShaderProgram(shader);
        cover1.build();
        cover1.translate(0, 0, 0.5);
        cover1.rotate(-Math.PI/2, 0, 0, 1);
        cover1.rotate(Math.PI, 0, 1, 0);
        this.addChild(cover1);

        var cover2 = new CarBodyCover(new Blue(2, 3), 1);
        cover2.setShaderProgram(shader);
        cover2.build();
        cover2.translate(0, 0, -0.5);
        cover2.rotate(-Math.PI/2, 0, 0, 1);
        cover2.rotate(Math.PI, 0, 1, 0);
        this.addChild(cover2);
    }
}
