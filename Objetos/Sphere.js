class Sphere extends Object3D{
    /**Esfera 3D
      * @param {rows} integer Cantidad de bandas longitudinales
      * @param {cols} integer Cantidad de bandas latitudinales
      * @param {color} Color Objeto de clase Color.
    */
    constructor(rows, cols, color){
        super();

        this.rows = rows;
        this.cols = cols;

        this.setIndexCreator(new VertexGrid(rows, cols));
        this.setPosCreator(this);
        this.setNormalCreator(this);
        if(!color) this.setColorCreator(new Gray(rows, cols));
        else this.setColorCreator(color);
    }
    /*Creador de positionBuffer*/
    setPosBuffer(){
        var buffer = [];

        var _rad = 1;
        var theta = (2*Math.PI)/(this.cols - 1);
        var phi = (Math.PI)/(this.rows - 1);

        for (var i = 0.0; i < this.rows; i++){
            for (var j = 0.0; j < this.cols; j++){
                // Para cada vértice definimos su posición como coordenada (x, y, z=0)
                //La variable X se define como R*Cos(theta)*Sin(phi)
                buffer.push(_rad*Math.cos(theta*j)*Math.sin(phi*i));
                //La variable Y se define como R*Cos(phi)
                buffer.push(_rad*Math.cos(phi*i));
                //La variable Z se define como R*Sen(theta)*Sin(phi)
                buffer.push(_rad*Math.sin(theta*j)*Math.sin(phi*i));
            }
        }

        return buffer;
    }
    /*Creador de normalBuffer*/
    setNormalBuffer(){
        //En la esfera ambos buffers son iguales
        return this.setPosBuffer();
    }

}
