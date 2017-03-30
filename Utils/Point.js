class Point{
    /*Simula un punto en el espacio*/
    constructor(x, y, z){
        this._x = x;
        this._y = y;
        this._z = z;
    }
    /*Setters*/
    set x(value){
        this._x = value;
    }
    set y(value){
        this._y = value;
    }
    set z(value){
        this._z = value;
    }
    /*Getters*/
    get x(){
        return this._x;
    }
    get y(){
        return this._y;
    }
    get z(){
        return this._z;
    }

}
