class LightBox extends Container3D{
    /*Luminaria de la autopista*/
    constructor(shader){
        super();

        var box = new Box(null, true);
        box.setShaderProgram(shader);
        /*Override*/
        box.setTextureBuffer = function(){
            var buffer = [ 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 1.0, 0.0,
                0.0, 0.0, 1.0, 0.0, 0.0, 1.0,
                1.0, 1.0, 0.0, 1.0, 1.0, 1.0, 0.0, 1.0, 1.0, 1.0, 0.0, 1.0, 1.0, 1.0
            ];
            return buffer;
        }
        box.build();
        box.id = 4;
        box.street = true;

        var cover1 = new BoxCover(null, true);
        cover1.setShaderProgram(shader);
        cover1.build();
        cover1.translate(0, 0, 0.5);
        cover1.rotate(-Math.PI, 0, 0, 1);
        cover1.id = 4;
        cover1.street = true;
        cover1.highway = true;

        var cover2 = new BoxCover(null, true);
        cover2.setShaderProgram(shader);
        cover2.build();
        cover2.translate(0, 0, -0.5);
        cover2.id = 4;
        cover2.street = true;
        cover2.highway = true;

        this.addChild(box);
        this.addChild(cover1);
        this.addChild(cover2);
        this.translate(0.2, 0.65, 0);
        this.scale(0.1, 0.035, 0.05);
        this.rotate(Math.PI/2, 1, 0, 0);
    }
}
