class LightBox extends Container3D{
    /*Luminaria de la autopista*/
    constructor(shader){
        super();

        var box = new Box(new Yellow(2, 8));
        box.setShaderProgram(shader);
        box.build();

        var cover1 = new BoxCover(new Yellow(2, 2));
        cover1.setShaderProgram(shader);
        cover1.build();
        cover1.translate(0, 0, 0.5);
        cover1.rotate(-Math.PI, 0, 0, 1);

        var cover2 = new BoxCover(new Yellow(2, 2));
        cover2.setShaderProgram(shader);
        cover2.build();
        cover2.translate(0, 0, -0.5);

        this.addChild(box);
        this.addChild(cover1);
        this.addChild(cover2);
        this.translate(0.2, 0.65, 0);
        this.scale(0.1, 0.035, 0.05);
        this.rotate(Math.PI/2, 1, 0, 0);
    }
}
