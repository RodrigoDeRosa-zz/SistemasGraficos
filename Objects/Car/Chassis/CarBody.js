class CarBody extends Object3D{
    /*Parte inferior del auto*/
    constructor(color, shader){
        super();

        var SWEPT_LEVELS = 2;
        var SHAPE_POINTS = 24;

        this.shape = new CarBodyShape(SHAPE_POINTS);
        this.path = new StraightLine(SWEPT_LEVELS);

        this.surface = new SweptSurface(this.shape, this.path);

        this.setIndexCreator(new VertexGrid(SWEPT_LEVELS, SHAPE_POINTS));
        this.setPosCreator(this.surface);
        this.setNormalCreator(this.surface);
        this.setTangentCreator(this.surface);
        this.setTextureCreator(this);

        var coverC = new Blue(2, 3);
        var cover1 = new CarBodyCover(coverC, -1);
        cover1.setShaderProgram(shader);
        cover1.build();
        cover1.translate(0, 0, 0.5);
        cover1.rotate(-Math.PI/2, 0, 0, 1);
        cover1.rotate(Math.PI, 0, 1, 0);
        this.addChild(cover1);

        var cover2 = new CarBodyCover(coverC, 1);
        cover2.setShaderProgram(shader);
        cover2.build();
        cover2.translate(0, 0, -0.5);
        cover2.rotate(-Math.PI/2, 0, 0, 1);
        cover2.rotate(Math.PI, 0, 1, 0);
        this.addChild(cover2);

        this.id = 7;
        this.shininess = 0.5;
        this.street = true;
    }
    setTextureBuffer(){
        return [
            0.036, 0.637,
            0.96, 0.628,
            0.96, 0.628,
            0.85, 0.64,
            0.85, 0.64,
            0.74, 0.64,
            0.74, 0.64,
            0.64, 0.65,
            0.64, 0.65,
            0.548, 0.65,
            0.548, 0.65,
            0.398, 0.637,
            0.398, 0.637,
            0.387, 0.67,
            0.387, 0.67,
            0.293, 0.646,
            0.293, 0.646,
            0.157, 0.66,
            0.157, 0.66,
            0.125, 0.645,
            0.125, 0.645,
            0.1, 0.637,
            0.1, 0.637,
            0.036, 0.637,
            /////Segundo nivel del barrido
            0.036, 0.966,
            0.96, 0.974,
            0.96, 0.974,
            0.85, 0.97,
            0.85, 0.97,
            0.74, 0.971,
            0.74, 0.971,
            0.64, 0.943,
            0.64, 0.943,
            0.548, 0.954,
            0.548, 0.954,
            0.398, 0.953,
            0.398, 0.953,
            0.387, 0.93,
            0.387, 0.93,
            0.293, 0.961,
            0.293, 0.961,
            0.157, 0.951,
            0.157, 0.951,
            0.125, 0.958,
            0.125, 0.958,
            0.1, 0.966,
            0.1, 0.966,
            0.036, 0.966
        ];
    }
}
