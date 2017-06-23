class OrbitCamera extends Camera{
    constructor(){
        super();
    }
    /**Define la distancia inicial de la camara al origen.
      * @param {x} float radio
    */
    setRadius(x){
        this.radius = x;
    }
    /**Define la sensibilidad del movimiento de la camara.
      * @param {x} float Se recomienda [x < 0.01]
    */
    setSensibility(x){
        this.sensibility = x;
    }
    /**Define la sensibilidad del zoom de la camara.
      * @param {x} float
    */
    setZoomSensibility(x){
        this.zoomSensibility = x;
    }
    /****Override***/
    initialise(){
        this.radius = 900;
        this.zoomSensibility = 0.5;
        this.sensibility = 0.009;
        this.theta = 0;
        /*La camara arranca mirando al origen*/
        vec3.set(this.lookAtVec, 0, 0, 0);
        /*El up siempre es arriba (eje Y positivo)*/
        vec3.set(this.upVec, 0, 1, 0);
        /*La posicion inicial es en diagonal arriba*/
        this.phi = Math.PI/10;
        var eyeY = this.radius*Math.sin(this.phi);
        var eyeZ = this.radius*Math.cos(this.phi);
        vec3.set(this.eyePoint, 0, eyeY, eyeZ);
    }
    /**Agranda o achica el radio de la esfera sobre la que se mueve la camara
      * @param {value} float Valor del zoom.
    */
    zoom(value){
        this.radius += value*this.zoomSensibility;
        if (this.radius < 10) this.radius = 10;

        var eyeX = this.radius*Math.sin(this.theta)*Math.sin(this.phi);
        var eyeY = this.radius*Math.cos(this.phi);
        var eyeZ = this.radius*Math.cos(this.theta)*Math.sin(this.phi);

        vec3.set(this.eyePoint, eyeX, eyeY, eyeZ);
    }
    /**Actualiza la posicion de la camara*/
    refresh(){
        var deltaX = mouse.x - previousClientX;
        var deltaY = mouse.y - previousClientY;

        previousClientX = mouse.x;
        previousClientY = mouse.y;

        this.theta += deltaX*this.sensibility;
        this.phi += deltaY*this.sensibility;

        if (this.phi <= 0) this.phi = 0.001;
        if (this.phi >= Math.PI) this.phi = Math.PI;

        var eyeX = this.radius*Math.sin(this.theta)*Math.sin(this.phi);
        var eyeY = this.radius*Math.cos(this.phi);
        var eyeZ = this.radius*Math.cos(this.theta)*Math.sin(this.phi);

        vec3.set(this.eyePoint, eyeX, eyeY, eyeZ);
    }
    /**Verifica si se esta intentado mover la camara y la mueve*/
    tick(){
        if (mouseDown) this.refresh();
    }
}
