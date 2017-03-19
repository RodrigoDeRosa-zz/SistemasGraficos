class Punto{
    /*Simula un punto en el espacio*/
    constructor(x, y, z){
        this.x = x;
        this.y = y;
        this.z = z;
    }
    /*Setters*/
    set x(value){
        this.x = value;
    }
    set y(value){
        this.y = value;
    }
    set z(value){
        this.z = value;
    }
    /*Getters*/
    get x(){
        return this.x;
    }
    get y(){
        return this.y;
    }
    get z(){
        return this.z;
    }

}
