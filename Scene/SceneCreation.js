/**Crea la escena*/
function createScene(){
    scene = new Container3D();
    scene.setShaderProgram(mShaderProgram);

    var blockType = curveController.blockType;
    var grid = new Grid(mShaderProgram, 5, blockType);
    //grid.scale(8,8,8);

    /*var column = new Column();
    column.setShaderProgram(mShaderProgram);
    column.build();
    column.scale(8,8,8);*/

    /*var road1 = new Road(mShaderProgram);
    road1.translate(0, 1.2, 0);
    var road2 = new Road(mShaderProgram);

    var highway = new Container3D();
    highway.setShaderProgram(mShaderProgram);
    highway.addChild(road1);
    highway.addChild(road2);
    scene.addChild(highway);
    scene.addChild(grid);

    var car = new CarBody(new Blue(2, 16));
    car.setShaderProgram(mShaderProgram);
    car.build();
    car.rotate(Math.PI/2, 0,0,1);

    scene.addChild(car);*/

    var light = new LightBody();
    light.setShaderProgram(mShaderProgram);
    light.build();
    light.rotate(Math.PI/2, 0, 0, 1);
    light.rotate(Math.PI/2, 1, 0, 0);
    light.translate(0, -0.5, 0);

    scene.addChild(light);
    scene.scale(8,8,8);
}
