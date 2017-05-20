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
    mat4.perspective(pMatrix, 3.14/12.0, gl.viewportWidth / gl.viewportHeight, 0.1, 1000.0);
    ////////////////////////////////////////////////////////
    //Camara
    var camera = cameraController.getActiveCamera();

    mat4.lookAt(CameraMatrix, camera.getEyePoint(), camera.getLookAtVec(), camera.getUpVec());
    mat4.multiply(CameraMatrix, CameraMatrix, camera.getMatrix());
    //////////////////////////////////////////////////////////////
    //Dibujado
    scene.setupLighting(vec3.fromValues(400.0, 100.0, 600.0), vec3.fromValues(0.3, 0.3, 0.3),
        vec3.fromValues(0.001, 0.001, 0.001));
    //scene.resetMatrix();
    //scene.rotate(frame, 0, 1, 0);
    scene.draw(mat4.create(), CameraMatrix, pMatrix, false);
    frame += 0.05;
}
