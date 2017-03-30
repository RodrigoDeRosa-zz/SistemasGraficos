class Shape{
    /*Forma para barrido y revolucion*/
    constructor(levels){
        this.positions = [];
        this.normals = [];
        this.tangents = [];
        this.levels = levels;
        /*Crean los arrays. Resposabilidad de las subclases*/
        this.setPositions();
        this.setNormals();
        this.setTangents();
    }
    /*Getter de cantidad de niveles*/
    getLevels(){
        return this.levels;
    }
    /**Setter de cantidad de niveles
      * @param {n} integer Numero de niveles.
    */
    setLevels(n){
        this.levels = n;
    }
    /**Devuelve un objeto de clase Punto de la lista de posiciones.
      * @param {index} integer Indice del objeto pedido.
    */
    getPosition(index){
        return this.positions[index];
    }
    /**Devuelve un objeto de clase Punto de la lista de normales.
      * @param {index} integer Indice del objeto pedido.
    */
    getNormal(index){
        return this.normals[index];
    }
    /**Devuelve un objeto de clase Punto de la lista de tangentes.
      * @param {index} integer Indice del objeto pedido.
    */
    getTangent(index){
        return this.tangents[index];
    }
    /*Creador de array de posiciones*/
    setPositions(){
        //TODO SUBCLASS
    }
    /*Creador de array de normales*/
    setNormals(){
        //TODO SUBCLASS
    }
    /*Creador de array de tangentes*/
    setTangents(){
        //TODO SUBCLASS
    }
}
