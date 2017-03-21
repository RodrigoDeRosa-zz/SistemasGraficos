/**Crea la escena*/
function createScene(){
    scene = new Container3D();
    scene.setShaderProgram(mShaderProgram);

    var esfera1 = new Sphere(60, 60, new Green(60, 60));
    esfera1.setShaderProgram(mShaderProgram);
    esfera1.build();
    var esfera2 = new Sphere(60, 60, new Red(60, 60));
    esfera2.setShaderProgram(mShaderProgram);
    esfera2.build();
    esfera2.translate(-2, 0, -2);
    var esfera3 = new Sphere(60, 60, new Blue(60, 60));
    esfera3.setShaderProgram(mShaderProgram);
    esfera3.build();
    esfera3.translate(2, 0, 2);

    var esferas = new Container3D();
    esferas.setShaderProgram(mShaderProgram);

    esferas.addChild(esfera1);
    esferas.addChild(esfera2);
    esferas.addChild(esfera3);
    esferas.scale(5, 5, 5);

    scene.addChild(esferas);
}
