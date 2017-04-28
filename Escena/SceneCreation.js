/**Crea la escena*/
function createScene(){
    scene = new Container3D();
    scene.setShaderProgram(mShaderProgram);

    var block1 = new Block(mShaderProgram);
    block1.scale(8, 8, 8);

    var hood = new Container3D();
    hood.setShaderProgram(mShaderProgram);

    hood.addChild(block1);


    scene.addChild(hood);
}
