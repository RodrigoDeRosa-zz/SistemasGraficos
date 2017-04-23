class VertexGrid{
    /**Grilla de vertices. Generador de indexBuffer.
      * @param {rows} integer Numero de filas.
      * @param {cols} integer Numero de columnas.
    */
    constructor(cols, rows){
        this.rows = rows;
        this.cols = cols
    }
    /*Crea y devuelve un buffer con los index de un vertex grid*/
    setIndexBuffer(){
        var buffer = [];

        for (var i = 0; i < (this.rows - 1); i++){
            //Si las filas son cero o pares se recorre a la derecha y sino a la izquierda
            if ((i % 2) == 0){
                //Recorrido hacia la derecha
                var init = this.cols*i;
                var next = this.cols*(i+1);
                for (var j = 0; j < this.cols; j++){
                    buffer.push(init + j);
                    buffer.push(next + j);
                }
            }else{
                //Recorrido hacia la izquierda
                var init = this.cols*(i+1) - 1;//El primer vertice es 0!!!!!
                var next = this.cols*(i+2) - 1;
                for (var j = 0; j < this.cols; j++){
                    buffer.push(init - j);
                    buffer.push(next - j);
                }
            }
        }
        return buffer;
    }
}
