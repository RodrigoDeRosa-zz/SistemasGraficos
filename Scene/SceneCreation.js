/**Crea la escena*/
function createScene(){
    frame = 0.0;

    scene = new Container3D();
    scene.setShaderProgram(skyShader);
    scene.useLight = false;

    var sky = new Sky();
    sky.scale(25, 25, 25);
    sky.translate(0, -0.25, 0);
    sky.rotate(Math.PI - Math.PI/10 - 0.15, 0, 1, 0);
    scene.addChild(sky);

    var blockType = curveController.blockType;
    var grid = new Grid(streetShader, 5, blockType);
    scene.addChild(grid);
    carControl = new CarControl(20, streetShader);

    var highway = new Highway(streetShader);
    scene.addChild(highway);

    scene.scale(60, 60, 60);
}
