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
    });

    $("body").keydown(function(e){
        if(e.keyCode == 76) globalDrawType = gl.LINE_LOOP; //L
        if(e.keyCode == 86) globalDrawType = null;//V
        if(e.keyCode == 70) globalDrawType = gl.TRIANGLE_STRIP;//F
    });
}

function resetMouse(){
    previousClientX = mouse.x;
    previousClientY = mouse.y;
}
