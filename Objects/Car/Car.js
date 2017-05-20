class Car extends Container3D{
    /*Auto que se mueve por la autopista*/
    constructor(shader){
        super();
        this.setShaderProgram(shader);

        var body = new CarBody(new Blue(2, 16), shader);
        body.setShaderProgram(shader);
        body.build();
        /*
        var tyreSet = new CarTyreSet();

        this.addChild(roof);
        this.addChild(tyreSet);
        */
        this.addChild(body);

        this.rotate(Math.PI/2, 0, 0, 1);
    }
}
