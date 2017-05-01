/**Crea la escena*/
function createScene(){
    scene = new Container3D();
    scene.setShaderProgram(mShaderProgram);

    var block1 = new zAxisBlock(mShaderProgram, BLOCK_BUILDING, 1);

    var hood = new Container3D();
    hood.setShaderProgram(mShaderProgram);

    hood.addChild(block1);

    hood.translate(0, 0, 0);
    hood.scale(8, 8, 8);

    scene.addChild(hood);
}
