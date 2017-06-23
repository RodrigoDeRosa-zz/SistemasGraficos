function setButtons(){
    $("#mainCanvas").mousemove(function(e){
        mouse.x = e.clientX || e.pageX;
        mouse.y = e.clientY || e.pageY;
    });

    $("#mainCanvas").mousedown(function(e){
        lastReceiver = mainCanvas;
        resetMouse();
        mouseDown = true;
    });

    $('#mainCanvas').mousewheel(function(e){
        cameraController.zoom(e.deltaY*e.deltaFactor);
    });

    $('#mainCanvas').mouseout(function(e){
        mouseDown = false;
    });

    $("body").mouseup(function(e){
        mouseDown = false;
        resetMouse();
        onDrag = false;
        curveController.modified = true; //Para despintar el circulo
    });

    $("body").keydown(function(e){
        if(e.keyCode == 76) globalDrawType = gl.LINE_LOOP; //L
        if(e.keyCode == 86) globalDrawType = null;//V
        if(e.keyCode == 70) globalDrawType = gl.TRIANGLE_STRIP;//F
        if(e.keyCode == 67) cameraController.changeCamera();//C
        if(e.keyCode == 65) cameraController.moveLeft();//A
        if(e.keyCode == 83) cameraController.moveBack();//S
        if(e.keyCode == 68) cameraController.moveRight();//D
        if(e.keyCode == 87) cameraController.moveForward();//W
        if(e.keyCode == 90) stopCars = !stopCars;//Z
    });

    $("#curveCanvas").mousemove(function(e){
        if (mouseDown) curveController.initDragging(e);
    });

    $("#curveCanvas").mousedown(function(e){
        lastReceiver = curveCanvas;
        mouseDown = true;
    });
}

function resetMouse(){
    previousClientX = mouse.x;
    previousClientY = mouse.y;
}
