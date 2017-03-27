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
}

function resetMouse(){
    previousClientX = mouse.x;
    previousClientY = mouse.y;
}
