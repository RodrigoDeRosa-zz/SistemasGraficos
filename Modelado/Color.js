class Color{
    constructor(rows, cols){
        this.rows = rows;
        this.cols = cols;
        this.red = null;
        this.green = null;
        this.blue = null;
        this._setColorFunctions();
    }
    /*Define las funciones de color*/
    _setColorFunctions(){
        //TODO IN SUBCLASS
    }
    setColorBuffer(){
        //TODO IN SUBCLASS
    }
    /*Crea el buffer con las funciones de color recibidas.
    Dichas funciones son del tipo f(i,j), siendo i las filas
    y j las columnas.*/
    _createBuffer(r, g, b){
        var buffer = [];

        for (var i = 0.0; i < this.rows; i++){
            for (var j = 0.0; j < this.cols; j++){
                buffer.push(r(i,j));
                buffer.push(g(i,j));
                buffer.push(b(i,j));
            }
        }

        return buffer;
    }
}

class Gray extends Color{
    constructor(rows, cols){
        super(rows, cols);
    }
    _setColorFunctions(){
        this.red = function(i, j){return 1;};
        this.green = function(i, j){return 1;};
        this.blue = function(i, j){return 1;};
    }
    setColorBuffer(){
        return this._createBuffer(this.red, this.green, this.blue);
    }
}

class Red extends Color{
    constructor(rows, cols){
        super(rows, cols);
    }
    _setColorFunctions(){
        this.red = function(i, j){return 1;};
        this.green = function(i, j){return 0;};
        this.blue = function(i, j){return 0;};
    }
    setColorBuffer(){
        return this._createBuffer(this.red, this.green, this.blue);
    }
}

class Green extends Color{
    constructor(rows, cols){
        super(rows, cols);
    }
    _setColorFunctions(){
        this.red = function(i, j){return 0;};
        this.green = function(i, j){return 1;};
        this.blue = function(i, j){return 0;};
    }
    setColorBuffer(){
        return this._createBuffer(this.red, this.green, this.blue);
    }
}

class Blue extends Color{
    constructor(rows, cols){
        super(rows, cols);
    }
    _setColorFunctions(){
        this.red = function(i, j){return 0;};
        this.green = function(i, j){return 0;};
        this.blue = function(i, j){return 1;};
    }
    setColorBuffer(){
        return this._createBuffer(this.red, this.green, this.blue);
    }
}
