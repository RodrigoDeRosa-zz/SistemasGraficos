/**Crea la escena*/
function createScene(){
    scene = new Container3D();
    scene.setShaderProgram(mShaderProgram);

    /*
    var blockType = curveController.blockType;
    var grid = new Grid(mShaderProgram, 5, blockType);

    var highway = new Highway(mShaderProgram);
    scene.addChild(highway);
    */

    var car = new Car(mShaderProgram);
    scene.addChild(car);
    scene.scale(18,18,18);
}
