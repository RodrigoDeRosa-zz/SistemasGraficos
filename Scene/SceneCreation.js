/**Crea la escena*/
function createScene(){
    scene = new Container3D();
    scene.setShaderProgram(mShaderProgram);

    var blockType = curveController.blockType;
    var grid = new Grid(mShaderProgram, 5, blockType);

    var hood = new Container3D();
    hood.setShaderProgram(mShaderProgram);

    hood.addChild(grid);

    hood.scale(8, 8, 8);

    scene.addChild(hood);
}
