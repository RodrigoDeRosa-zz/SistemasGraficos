/**Crea la escena*/
function createScene(){
    scene = new Container3D();
    scene.setShaderProgram(mShaderProgram);

    var blockType = [];
    for (var i = -2; i <= 2; i++){
        blockType.push([]);
        var x = i + 2;
        for (var j = -2; j <= 2; j++){
            var type = Math.floor(Math.random()*4);
            if (type > 1) type = 0;
            blockType[x].push(type);
        }
    }
    var grid = new Grid(mShaderProgram, 5, blockType);

    var hood = new Container3D();
    hood.setShaderProgram(mShaderProgram);

    hood.addChild(grid);

    hood.scale(8, 8, 8);

    scene.addChild(hood);
}
