class Grid extends Container3D{
    /**Grilla de la ciudad de n*n*/
    constructor(n){
        super();

        this.n = n;
        this.matrix = this.initMatrix(); //Matriz de la ciudad
        this.setCity();
        this.addChildren();
    }
    /*Inicializa la matriz de la ciudad con n listas de n elementos null*/
    initMatrix(){
        var matrix = [];
        for (var i = 0; i < this.n; i++){
            matrix.push([]);
            for (var j = 0; j < this.n; j++){
                matrix[i].push(0x0);
            }
        }
        return matrix;
    }
    /*Agrega manzanas a la matriz*/
    setCity(){
        var x, z;
        for (var i = -(this.n/2); i < this.n/2; i++){
            x = i + this.n/2;
            for (var j = -(this.n/2); j < this.n/2; j++){
                z = j + this.n/2;
                this.matrix[i][j] = this.setBlock(i, j);
            }
        }
    }
    /*Devuelve la manzana segun x y z*/
    setBlock(x, z){
        if (x == 0 && z == 0) return new CentralBlock();
    }
}
