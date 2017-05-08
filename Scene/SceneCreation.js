/**Crea la escena*/
function createScene(){
    scene = new Container3D();
    scene.setShaderProgram(mShaderProgram);

    /*var blockType = curveController.blockType;
    var grid = new Grid(mShaderProgram, 5, blockType);
    grid.scale(8,8,8);*/

    /*var column = new Column();
    column.setShaderProgram(mShaderProgram);
    column.build();
    column.scale(8,8,8);*/

    var light = new LightBody();
    light.setShaderProgram(mShaderProgram);
    light.build();
    light.translate(0, -6, 0);
    light.scale(8,8,8);

    scene.addChild(light);
}
