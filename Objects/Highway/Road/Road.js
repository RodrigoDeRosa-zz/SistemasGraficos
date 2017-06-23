class Road extends Container3D{
    /*Camino de la autopista*/
    constructor(shader){
        super();
        this.setShaderProgram(shader);

        var asphalt = new Asphalt();
        asphalt.setShaderProgram(shader);
        asphalt.build();
        asphalt.highway = true;

        var concrete = new Concrete();
        concrete.setShaderProgram(shader);
        concrete.build();
        concrete.highway = true;

        this.addChild(asphalt);
        this.addChild(concrete);
    }
}
