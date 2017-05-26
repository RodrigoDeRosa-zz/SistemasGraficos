class Sidewalk extends Container3D{
    /*Contiene el costado de la vereda y la parte de arriba*/
    constructor(shader, color, texture, id){
        super();

        /*Creacion*/
        var side = new SidewalkSide(color, texture, id);
        if (texture) side.setShaderProgram(streetShader);
        else side.setShaderProgram(shader);
        side.build();
        /*Transformacion*/
        side.translate(0, -0.01, 0);
        side.scale(0.8, 0.02, 0.8);
        side.rotate(Math.PI/2, 1, 0, 0);
        this.addChild(side);
        /*Creacion*/
        var top = new SidewalkTop(color, texture, id);
        if (texture) top.setShaderProgram(streetShader);
        else top.setShaderProgram(shader);
        top.build();
        /*Transformacion*/
        top.scale(0.8, 1, 0.8);
        top.rotate(Math.PI/2, 1, 0, 0);
        this.addChild(top);
    }
}
