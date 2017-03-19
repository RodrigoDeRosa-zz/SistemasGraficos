/*Actualiza la pantalla*/
function tick() {
    requestAnimFrame(tick);
    drawScene();
}
/*Setea todo lo necesario para el dibujado y dibuja los objetos de la escena*/
function drawScene(){
    //Se setea el viewport dentro del area del canvas. En este caso se usa todo el area
    gl.viewport(0, 0, gl.viewportWidth, gl.viewportHeight);
    //Se habilita el color de borrado para la pantalla
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    //Se configura la matriz de proyeccion
    mat4.perspective(pMatrix, 3.14/12.0, gl.viewportWidth / gl.viewportHeight, 0.1, 1000.0);
    ////////////////////////////////////////////////////////
    //Camara
    var matCamara = mat4.create();
    mat4.identity(matCamara);
    //Ubicacion de la camara
    var eyePoint = vec3.create();
    vec3.set(eyePoint, 40, 75, -100);
    //Direccion en la que se mira
    var atPoint = vec3.create();
    vec3.set(atPoint, 0, 0, 0);
    //"Arriba" de la camara
    var upPoint = vec3.create();
    vec3.set(upPoint, 0, 1, 0);
    //Hacemos que la matriz de la camara tenga las caracteristicas de arriba
    mat4.lookAt(CameraMatrix, eyePoint, atPoint, upPoint);
    mat4.multiply(CameraMatrix, CameraMatrix, matCamara);

    scene.setupLighting(vec3.fromValues(0.0, 1000.0, 600.0), vec3.fromValues(0.3, 0.3, 0.3),
        vec3.fromValues(0.001, 0.001, 0.001));
    scene.resetMatrix();
    scene.rotate(frame, 1, 0, 0);
    scene.translate(4*Math.sin(frame), 4*Math.cos(frame), 4*Math.cos(frame)*Math.sin(frame));
    scene.draw(mat4.create(), CameraMatrix, pMatrix);
    frame += 0.1;
}
