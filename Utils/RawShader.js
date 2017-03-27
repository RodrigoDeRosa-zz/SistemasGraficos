class RawShader{
    constructor(){
        this.shader = null;
        this.type = null;
    }
    /**Setea el string del shader program
      * @param {shader} string Cadena que contiene el shader program.
    */
    setShaderCode(shader){
        this.shader = shader;
    }
    /*Devuelve el string que contiene el shader program.*/
    getShaderCode(){
        return this.shader;
    }
    /*Devuelve el tipo de shader (Vertex, fragment)*/
    getType(){
        return this.type;
    }
}

class RawVertexShader extends RawShader{
    constructor(){
        super();
        this.type = gl.VERTEX_SHADER;
    }
}

class RawFragmentShader extends RawShader{
    constructor(){
        super();
        this.type = gl.FRAGMENT_SHADER;
    }
}
