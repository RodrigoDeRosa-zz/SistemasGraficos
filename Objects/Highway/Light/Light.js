class Light extends Container3D{
    /*Luminaria de la autopista*/
    constructor(shader){
        super();
        this.setShaderProgram(shader);

        var lightBody = new LightBody();
        lightBody.setShaderProgram(shader);
        lightBody.build();
        lightBody.rotate(Math.PI/2, 0, 0, 1);
        lightBody.rotate(Math.PI/2, 1, 0, 0);

        var lightBox = new LightBox(shader);
        lightBox.setShaderProgram(shader);

        this.addChild(lightBody);
        this.addChild(lightBox);
    }
}
