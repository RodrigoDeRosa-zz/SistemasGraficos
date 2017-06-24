/**Actualiza la pantalla*/
function tick() {
    if(lastReceiver == mainCanvas && mouseDown) cameraController.tick();

    requestAnimFrame(tick);
    curveController.animate();
    drawScene();
}
/**Setea todo lo necesario para el dibujado y dibuja los objetos de la escena*/
function drawScene(){
    //Se setea el viewport dentro del area del canvas. En este caso se usa todo el area
    gl.viewport(0, 0, gl.viewportWidth, gl.viewportHeight);
    //Se habilita el color de borrado para la pantalla
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    //Se configura la matriz de proyeccion
    mat4.perspective(pMatrix, 3.14/12.0, gl.viewportWidth / gl.viewportHeight, 1.0, 10000.0);
    ////////////////////////////////////////////////////////
    //Camara
    var camera = cameraController.getActiveCamera();

    mat4.lookAt(CameraMatrix, camera.getEyePoint(), camera.getLookAtVec(), camera.getUpVec());
    mat4.multiply(CameraMatrix, CameraMatrix, camera.getMatrix());
    //////////////////////////////////////////////////////////////
    //Dibujado
    scene.setupLighting(sunPos[currentTime], ambientColor[currentTime], diffuseColor[currentTime]);
    if (!stopCars) carControl.tick();
    gl.useProgram(buildingShader);
    var t = gl.getUniformLocation(buildingShader, "t");
    gl.uniform1f(t, frame);
    scene.draw(mat4.create(), CameraMatrix, pMatrix, false);
    frame += 1.75;
}
