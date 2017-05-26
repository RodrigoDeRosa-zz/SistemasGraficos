class BuildingSet extends Container3D{
    /**Cada uno de los 4 grupos de 4 edificios de una manzana.
      * @param {shader} ShaderProgram
    */
    constructor(shader, number){
        super();
        this.setShaderProgram(shader);
        this.buildingConstructor = new BuildingConstructor();
        this.setBuildingSet(number);
    }
    /*Genera un set de 4 edificios y los devuelve*/
    setBuildingSet(number){
        var WIDTH1 = 0.15, WIDTH2 = 0.3, WIDTH3 = 0.2, WIDTH4 = 0.1;

        var building1 = this.buildingConstructor.getBuilding(1, buildingShader, number);
        var building2 = this.buildingConstructor.getBuilding(2, buildingShader, number);
        var building3 = this.buildingConstructor.getBuilding(3, buildingShader, number);
        var building4 = this.buildingConstructor.getBuilding(4, buildingShader, number);
        var buildings = [[building1, WIDTH1], [building2, WIDTH2],
            [building3, WIDTH3], [building4, WIDTH4]];

        var previousWidths = [];
        for (var i = 0; i < 4; i++){
            var index = Math.floor(Math.random() * buildings.length);
            var pair = (buildings.splice(index, 1))[0];
            var building = pair[0];
            var width = pair[1];

            /*Se crea una matriz de translacion para mover el edificio*/
            var x = this.calculateX(width, previousWidths);
            previousWidths.push(width);

            var transMat = mat4.create();
            var vector = vec3.fromValues(x, 0, 0);
            mat4.translate(transMat, mat4.create(), vector);
            building.applyMatrixLeft(transMat);

            this.addChild(building);
        }
    }
    /**Calcula la posicion en x del edificio.
      * @param {width} array Lista de anchos de los edificios.
      * @param {previousWidths} array Lista de anchos anteriores.
    */
    calculateX(width, previousWidths){
        var x = width/2.0;
        if (previousWidths.length != 0){
            for (var i = 0; i < previousWidths.length; i++){
                x += previousWidths[i]; //Se suma el total de los intermedios
            }
        }
        return x;
    }
}
