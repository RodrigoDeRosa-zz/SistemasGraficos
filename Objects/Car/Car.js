class Car extends Container3D{
    /*Auto que se mueve por la autopista*/
    constructor(shader){
        super();
        this.setShaderProgram(shader);

        var body = new CarBody(new Blue(2, 16), shader);
        body.setShaderProgram(shader);
        body.build();

        var roof = new CarRoof(new Blue(2, 8), shader);
        roof.setShaderProgram(shader);
        roof.build();

        var chassis = new Container3D();
        chassis.setShaderProgram(shader);
        chassis.addChild(roof);
        chassis.addChild(body);
        chassis.scale(1, 1, 0.6);
        chassis.translate(0.075, 0, 0);
        this.addChild(chassis);

        var tyreSet = new CarTyreSet(shader);
        this.addChild(tyreSet);


        this.rotate(Math.PI/2, 0, 0, 1);
    }
}
