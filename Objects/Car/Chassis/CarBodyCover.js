class CarBodyCover extends Object3D{
    /*Forma de la parte inferior de un auto*/
    constructor(color, side){
        super();

        this.side = side;
        this.setIndexCreator(this);
        this.setPosCreator(this);
        this.setNormalCreator(this);
        this.setTangentCreator(this);
        this.setTextureCreator(this);
        this.id = 7;
        this.street = true;
        this.shininess = 0.5;
    }
    setPosBuffer(){
        var p0 = new Point(-0.488, 0, 0);
        var p1 = new Point(0.489, 0, 0);
        var p2 = new Point(0.489, 0.183, 0);
        var p3 = new Point(0.389, 0.198, 0);
        var p4 = new Point(0.243, 0.271, 0);
        var p5 = new Point(0.145, 0.290, 0);
        var p6 = new Point(-0.040, 0.283, 0);
        var p7 = new Point(-0.090, 0.267, 0);
        var p8 = new Point(-0.215, 0.175, 0);
        var p9 = new Point(-0.441, 0.147, 0);
        var p10 = new Point(-0.466, 0.127, 0);
        var p11 = new Point(-0.488, 0.08, 0);
        return [
            p0.x, p0.y, p0.z,
            p1.x, p1.y, p1.z,
            p2.x, p2.y, p2.z,
            p3.x, p3.y, p3.z,
            p4.x, p4.y, p4.z,
            p5.x, p5.y, p5.z,
            p6.x, p6.y, p6.z,
            p7.x, p7.y, p7.z,
            p8.x, p8.y, p8.z,
            p9.x, p9.y, p9.z,
            p10.x, p10.y, p10.z,
            p11.x, p11.y, p11.z,
        ];
    }
    setTangentBuffer(){
        var buffer = [];
        for (var i = 0; i < 12; i++){
            buffer.push(0);
            buffer.push(1);
            buffer.push(0);
        }
        return buffer;
    }
    setNormalBuffer(){
        var buffer = [];
        for (var i = 0; i < 12; i++){
            buffer.push(0);
            buffer.push(0);
            buffer.push(this.side);
        }
        return buffer;
    }
    setIndexBuffer(){
        return [1, 0, 11, 1, 11, 10, 1, 10, 9, 1, 9, 8, 1, 8, 7,
            1, 7, 6, 1, 6, 5, 1, 5, 4, 1, 4, 3, 1, 3, 2];
    }
    setTextureBuffer(){
        return [
            0.0097, 0.34,
            0.964, 0.34,
            0.964, 0.516,
            0.866, 0.53,
            0.724, 0.6,
            0.628, 0.62,
            0.447, 0.613,
            0.398, 0.597,
            0.276, 0.5,
            0.055, 0.48,
            0.0312, 0.46,
            0.0097, 0.415
        ];
    }
}
