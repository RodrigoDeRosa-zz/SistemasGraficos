class Shape{
    /*Forma para barrido y revolucion*/
    constructor(){
        this.positions = null;
        this.normals = null;
        this.tangents = null;
        this.levels = null;
        /*Crean los arrays. Resposabilidad de las subclases*/
        this.setPositions();
        this.setNormals();
        this.setTangents();
    }
    /*Getter de cantidad de niveles*/
    get levels(){
        return this.levels;
    }
    /*Setter de cantidad de niveles*/
    set levels(n){
        this.levels = n;
    }
    /*Devuelve un objeto de clase Punto, en la posicion pedida por parametro,
    en la lista de posiciones.*/
    getPosition(index){
        return this.positions[index];
    }
    /*Devuelve un objeto de clase Punto, en la posicion pedida por parametro,
    en la lista de normales*/
    getNormal(index){
        return this.normals[index];
    }
    /*Devuelve un objeto de clase Punto, en la posicion pedida por parametro,
    en la lista de tangentes*/
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
