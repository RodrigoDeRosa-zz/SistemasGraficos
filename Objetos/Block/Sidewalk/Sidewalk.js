class Sidewalk extends Container3D{
    /*Contiene el costado de la vereda y la parte de arriba*/
    constructor(shader){
        super();

        var side = new SidewalkSide();
        side.setShaderProgram(shader);
        side.build();
        side.translate(0, -0.01, 0);
        side.scale(0.8, 0.02, 0.8);
        side.rotate(Math.PI/2, 1, 0, 0);
        this.addChild(side);

        var top = new SidewalkTop();
        top.setShaderProgram(shader);
        top.build();
        top.scale(0.8, 1, 0.8);
        top.rotate(Math.PI/2, 1, 0, 0);
        this.addChild(top);
    }
}
