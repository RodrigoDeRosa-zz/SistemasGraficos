class CarTyre extends Object3D{
    /*Parte inferior del auto*/
    constructor(color, shader){
        super();

        var SWEPT_LEVELS = 2;
        var SHAPE_POINTS = 15;

        this.shape = new Circle(SHAPE_POINTS, 0.073);
        this.path = new StraightLine(SWEPT_LEVELS);

        this.surface = new SweptSurface(this.shape, this.path);

        this.setIndexCreator(new VertexGrid(SWEPT_LEVELS, SHAPE_POINTS));
        this.setPosCreator(this.surface);
        this.setNormalCreator(this.surface);
        this.setTangentCreator(this.surface);
        this.setTextureCreator(this);

        this.scale(1, 1, 0.125);
        this.translate(0.075, 0, 0);
        this.highway = true;

        var cover1 = new CarTyreCover(null, -1, SHAPE_POINTS);
        cover1.setShaderProgram(shader);
        cover1.build();
        cover1.translate(0, 0, 0.5);
        cover1.rotate(-Math.PI/2, 0, 0, 1);
        cover1.rotate(Math.PI, 0, 1, 0);
        this.addChild(cover1);
        cover1.highway = true;

        var cover2 = new CarTyreCover(null, 1, SHAPE_POINTS);
        cover2.setShaderProgram(shader);
        cover2.build();
        cover2.translate(0, 0, -0.5);
        cover2.rotate(-Math.PI/2, 0, 0, 1);
        cover2.rotate(Math.PI, 0, 1, 0);
        this.addChild(cover2);
        cover2.highway = true;

        this.id = 7;
        this.street = false;
    }
    setTextureBuffer(){
        var buffer = [];
        var theta = 2*Math.PI/(14);
        for (var j = 0; j < 2; j++){
            for (var i = 0.0; i < 15; i++){
                var u = 0.0865*Math.cos(theta*i) + 0.5;
                var v = 0.0865*Math.sin(theta*i) + 0.155;
                buffer.push(u);
                buffer.push(v);
            }
        }
        return buffer;
    }
}
