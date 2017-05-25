/**Crea la escena*/
function createScene(){
    scene = new Container3D();
    scene.setShaderProgram(mShaderProgram);

    carControl = new CarControl(10, mShaderProgram);

    var blockType = curveController.blockType;
    var grid = new Grid(mShaderProgram, 5, blockType);
    scene.addChild(grid);
    /*

    var car = new Car(mShaderProgram);
    scene.addChild(car);
    */
    var highway = new Highway(mShaderProgram);
    scene.addChild(highway);

    scene.scale(18,18,18);
}
