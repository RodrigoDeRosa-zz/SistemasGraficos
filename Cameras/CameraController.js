class CameraController{
    constructor(){
        this.cameras = [];
        this.camera = null;
        this.cameraIndex = 0;
    }
    /**Selecciona la primer camara de la lista*/
    init(){
        if (this.cameras.length == 0) alert("Empty camera controller.");
        this.camera = this.cameras[0];
    }
    /**Agrega una camara al controlador.
      * @param {camera} Camera
    */
    addCamera(camera){
        this.cameras.push(camera);
    }
    /**Devuelve la camara actual*/
    getActiveCamera(){
        return this.camera;
    }
    /**Selecciona la proxima camara en la lista*/
    changeCamera(){
        var index = (cameraIndex++)%this.cameras.length;
        this.camera = this.cameras[index];
    }
    /**Refresca la camara actual*/
    tick(){
        this.camera.tick();
    }
    /**Acerca la camara en el valor dado
      * @param {valor} float
    */
    zoom(valor){
        this.camera.zoom(valor);
    }
    /**Mueve la camara actual a la izquierda*/
    moveLeft(){
        this.camera.moveLeft();
    }
    /**Mueve la camara actual a la derecha*/
    moveRight(){
        this.camera.moveRight();
    }
    /**Mueve la camara actual hacia adelante*/
    moveForward(){
        this.camera.moveForward();
    }
    /**Mueve la camara actual hacia atras*/
    moveBack(){
        this.camera.moveBack();
    }
    /**Gira la camara hacia la derecha*/
    rollRight(){
        this.camera.rollRight();
    }
    /**Gira la camara hacia la izquierda*/
    rollLeft(){
        this.camera.rollLeft();
    }
}
