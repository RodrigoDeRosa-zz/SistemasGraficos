class Grid extends Container3D{
    /**Grilla de la ciudad de n*n
      * @param {n} integer Se espera que sea impar.
      * @param {blockType} array Arreglo de n*n que indica el tipo de edificio en cada manana
    */
    constructor(shader, n, blockType){
        super();
        this.setShaderProgram(shader);

        this.shader = shader;
        this.n = n;
        this.blockType = blockType;
        this.cityMatrix = [];
        this.setCity();
        this.addChildren();
    }
    /*Agrega manzanas a la matriz. Si n es 5, hace -2,-1,0,1,2*/
    setCity(){
        var x, z;
        for (var i = -((this.n-1)/2); i <= (this.n-1)/2; i++){
            this.cityMatrix.push([]);
            z = i + (this.n-1)/2;
            for (var j = -((this.n-1)/2); j <= (this.n-1)/2; j++){
                this.cityMatrix[z].push(this.setBlock(i, j));
            }
        }
    }
    /*Devuelve la manzana segun x y z*/
    setBlock(x, z){
        var block;
        var type = this.blockType[x+(this.n-1)/2][z+(this.n-1)/2];
        if (z == 0){
            if (x == 0) block = new CentralBlock(this.shader, type);
            if (x > 0) block = new zAxisBlock(this.shader, streetShader, type, 1);
            if (x < 0) block = new zAxisBlock(this.shader, streetShader, type, -1);
        } else if (x == 0){
            if (z < 0) block = new xAxisBlock(this.shader, streetShader, type, -1);
            if (z > 0) block = new xAxisBlock(this.shader, streetShader, type, 1);
        } else if (z > 0){
            if (x > 0) block = new firstQuadrantBlock(this.shader, streetShader, type);
            if (x < 0) block = new fourthQuadrantBlock(this.shader, streetShader, type);
        } else{
            if (x > 0) block = new secondQuadrantBlock(this.shader, streetShader, type);
            else block = new thirdQuadrantBlock(this.shader, streetShader, type);
        }
        //Estan al reves para armar la matriz mas comodo desde afuera
        block.translate(z*1.4, 0, x*1.4);
        return block;
    }
    /*Agrega todas las manzanas como hijas*/
    addChildren(){
        for (var i = 0; i < this.n; i++){
            for (var j = 0; j < this.n; j++){
                this.addChild(this.cityMatrix[i][j]);
            }
        }
    }
}
