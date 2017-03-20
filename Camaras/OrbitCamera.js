class OrbitCamera extends Camera{
    constructor(){
        super();
        this.radius = 500;
        this.zoomSensibility = 0.5;
        this.sensibility = 0.001;
        this.phi = 0;
        this.theta = 0;
    }
    /**Define la distancia inicial de la camara al origen.
      * @param {x} float radio
    */
    set radius(x){
        this.radius = x;
    }
    /**Define la sensibilidad del movimiento de la camara.
      * @param {x} float Se recomienda [x < 0.01]
    */
    set sensibility(x){
        this.sensibility = x;
    }
    /**Define la sensibilidad del zoom de la camara.
      * @param {x} float
    */
    set zoomSensibility(x){
        this.zoomSensibility = x;
    }
    /****Override***/
    initialise(){
        /*La camara arranca mirando al origen*/
        vec3.set(this.lookAtVec, 0, 0, 0);
        /*El up siempre es arriba (eje Y positivo)*/
        vec3.set(this.upVec, 0, 1, 0);
        /*La posicion inicial es en diagonal arriba*/
        var phi = Math.PI/4;
        var eyeY = this.radius*Math.sin(phi);
        var eyeZ = this.radius*Math.cos(phi);
        vec3.set(this.eyePoint, 0, eyeY, eyeZ);
    }
    /**Agranda o achica el radio de la esfera sobre la que se mueve la camara
      * @param {value} float Valor del zoom.
    */
    zoom(value){
        this.radius += value*this.zoomSensibility;
        this.refresh();
    }
    /**Actualiza la posicion de la camara*/
    refresh(){
        var deltaX = mouse.x - previousClientX;
        var deltaY = mouse.y - previousClientY;

        previousClientX = mouse.x;
        previousClientY = mouse.y;

        this.theta += deltaX*sensibility;
        this.phi += detalY*sensibility;

        if (this.phi <= 0) this.phi = 0.001;
        if (this.phi > Math.PI/2) phi = Math.PI/2;

        var eyeX = this.radius*Math.sin(this.theta)*Math.sin(this.phi);
        var eyeY = this.radius*Math.cos(this.phi);
        var eyeZ = this.radius*Math.cos(this.theta)*Math.sin(this.phi);

        vec3.set(this.eyePoint, eyeX, eyeY, eyeZ);
    }
    /**Verifica si se esta intentado mover la camara y la mueve*/
    tick(){
        if (mouseDown) this.rotateCamera();
    }
}
