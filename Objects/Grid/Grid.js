class Grid extends Container3D{
    /**Grilla de la ciudad de n*n
      * @param {n} integer Se espera que sea impar.
      * @param {blockType} array Arreglo de n*n que indica el tipo de edificio en cada manana
    */
    constructor(shader, n, blockType){
        super();
        this.setShaderProgram(shader);

        this.parks = 0;

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
                x = j + (this.n-1)/2;
                var delay = (x-(this.parks*1.0))*10.0 + z*50.0;
                this.cityMatrix[z].push(this.setBlock(i, j, delay));
            }
        }
    }
    /*Devuelve la manzana segun x y z*/
    setBlock(x, z, number){
        var block;
        var type = this.blockType[x+(this.n-1)/2][z+(this.n-1)/2];
        if (type == BLOCK_PARK) this.parks++;
        if (z == 0){
            if (x == 0) block = new CentralBlock(this.shader, type, number);
            if (x > 0) block = new zAxisBlock(this.shader, streetShader, type, 1, number);
            if (x < 0) block = new zAxisBlock(this.shader, streetShader, type, -1, number);
        } else if (x == 0){
            if (z < 0) block = new xAxisBlock(this.shader, streetShader, type, -1, number);
            if (z > 0) block = new xAxisBlock(this.shader, streetShader, type, 1, number);
        } else if (z > 0){
            if (x > 0) block = new firstQuadrantBlock(this.shader, streetShader, type, number);
            if (x < 0) block = new fourthQuadrantBlock(this.shader, streetShader, type, number);
        } else{
            if (x > 0) block = new secondQuadrantBlock(this.shader, streetShader, type, number);
            else block = new thirdQuadrantBlock(this.shader, streetShader, type, number);
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
