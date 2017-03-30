/**Crea la escena*/
function createScene(){
    scene = new Container3D();
    scene.setShaderProgram(mShaderProgram);

    var sol = new RoundRing(60, 60, new Orange(60, 60));
    sol.setShaderProgram(mShaderProgram);
    sol.build();
    sol.scale(8, 8, 8);

    var grupoTierraLuna = new Container3D();
    grupoTierraLuna.setShaderProgram(mShaderProgram);

    var luna = new Sphere(60, 60);
    luna.setShaderProgram(mShaderProgram);
    luna.build();
    luna.translate(5, 0, 0);

    var tierra = new Sphere(60, 60, new Green(60, 60));
    tierra.setShaderProgram(mShaderProgram);
    tierra.build();
    tierra.scale(2.5, 2.5, 2.5);

    grupoTierraLuna.addChild(luna);
    grupoTierraLuna.addChild(tierra);
    grupoTierraLuna.translate(20, 0, 0);

    scene.addChild(sol);
    scene.addChild(grupoTierraLuna);
}
