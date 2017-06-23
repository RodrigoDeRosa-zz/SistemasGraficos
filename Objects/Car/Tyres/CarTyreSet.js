class CarTyreSet extends Container3D{
    /*Juego de ruedas del auto*/
    constructor(shader){
        super();
        this.setShaderProgram(shader);
        this.tyres = [];
        this.setTyres(shader);
    }
    setTyres(shader){
        /*Front left*/
        var tyre1 = new CarTyre(null, shader);
        tyre1.setShaderProgram(shader);
        tyre1.build();
        tyre1.translate(0.029, 0.29, 1.4);
        tyre1.scale(1, 1, 0.5);
        this.tyres.push(tyre1);
        this.addChild(tyre1);
        /*Front right*/
        var tyre2 = new CarTyre(null, shader);
        tyre2.setShaderProgram(shader);
        tyre2.build();
        tyre2.translate(0.029, 0.29, -1.4);
        tyre2.scale(1, 1, 0.5);
        this.tyres.push(tyre2);
        this.addChild(tyre2);
        /*Back left*/
        var tyre3 = new CarTyre(null, shader);
        tyre3.setShaderProgram(shader);
        tyre3.build();
        tyre3.translate(0.029, -0.312, 1.4);
        tyre3.scale(1, 1, 0.5);
        this.tyres.push(tyre3);
        this.addChild(tyre3);
        /*Back right*/
        var tyre4 = new CarTyre(null, shader);
        tyre4.setShaderProgram(shader);
        tyre4.build();
        tyre4.translate(0.029, -0.312, -1.4);
        tyre4.scale(1, 1, 0.5);
        this.tyres.push(tyre4);
        this.addChild(tyre4);
    }
    rotateWheels(){
        for (var i = 0; i < 4; i++){
            var tyre = this.tyres[i];
            var angle = (180/Math.PI)*(0.00075);
            tyre.rotate(-angle, 0, 0, 1);
        }
    }
}
