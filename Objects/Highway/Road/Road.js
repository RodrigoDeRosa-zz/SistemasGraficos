class Road extends Container3D{
    /*Camino de la autopista*/
    constructor(shader){
        super();
        this.setShaderProgram(shader);

        var asphalt = new Asphalt();
        asphalt.setShaderProgram(shader);
        asphalt.build();

        var concrete = new Concrete();
        concrete.setShaderProgram(shader);
        concrete.build();

        this.addChild(asphalt);
        this.addChild(concrete);

        this.translate(0, 0.3, -0.2);
        this.rotate(Math.PI/2, 0, 1, 0);
        this.rotate(Math.PI/2, 0, 0, 1);
        this.scale(0.25, 0.25, 0.25);
    }
}
