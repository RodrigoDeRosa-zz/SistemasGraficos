class CarTyreSet extends Container3D{
    /*Juego de ruedas del auto*/
    constructor(shader){
        super();
        this.setShaderProgram(shader);

        this.setTyres(shader);
    }
    setTyres(shader){
        /*Front left*/
        var tyre1 = new CarTyre(null, shader);
        tyre1.setShaderProgram(shader);
        tyre1.build();
        tyre1.translate(0, 0.25, 2.175);
        this.addChild(tyre1);
        /*Front right*/
        var tyre2 = new CarTyre(null, shader);
        tyre2.setShaderProgram(shader);
        tyre2.build();
        tyre2.translate(0, 0.25, -2.175);
        this.addChild(tyre2);
        /*Back left*/
        var tyre3 = new CarTyre(null, shader);
        tyre3.setShaderProgram(shader);
        tyre3.build();
        tyre3.translate(0, -0.25, 2.175);
        this.addChild(tyre3);
        /*Back right*/
        var tyre4 = new CarTyre(null, shader);
        tyre4.setShaderProgram(shader);
        tyre4.build();
        tyre4.translate(0, -0.25, -2.175);
        this.addChild(tyre4);
    }
}
