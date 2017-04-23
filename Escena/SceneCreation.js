/**Crea la escena*/
function createScene(){
    scene = new Container3D();
    scene.setShaderProgram(mShaderProgram);

    var building = new Building(1);
    building.setShaderProgram(mShaderProgram);
    building.build();
    building.rotate(Math.PI/2.0, 1, 0, 0);
    building.scale(8, 8, 8);

    scene.addChild(building);
}
