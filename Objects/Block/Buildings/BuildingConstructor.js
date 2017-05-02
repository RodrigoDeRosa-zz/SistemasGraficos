class BuildingConstructor{
    /*Constructor de edificios de tipos diferentes*/
    constructor(){
        //Solo se instancia la clase
    }
    /**Crea un del tipo indicado.
      * @param {type} integer Tipo de edificio a crear.
      * @param {shader} ShaderProgram Shader del edificio a crear.
      * @param {color} Color Objeto de clase Color.
    */
    getBuilding(type, shader, color){
        var building = new Container3D();
        building.setShaderProgram(shader);

        var roof = this.getRoof(shader);
        var body = this.getBody(type, shader, color, roof);

        building.addChild(roof);
        building.addChild(body);

        return building;
    }
    /**Crea un edificio default ([x,y,z]=[1,1,1]) y lo modifica segun su tipo.
      * @param {type} integer Tipo de edificio a crear.
      * @param {shader} ShaderProgram Shader del edificio a crear.
      * @param {color} Color Objeto de clase Color.
      * @param {roof} BuildingRoof Techo del edificio que se debe colocar arriba de todo.
    */
    getBody(type, shader, color, roof){
        var body = new Box(color);
        body.setShaderProgram(shader);
        body.build();

        this.modifyBuilding(type, body, roof);
        body.rotate(Math.PI/2.0, 1, 0, 0); //Para que quede "parado"

        return body;
    }
    /**Crea el techo de un edificio.
      * @param {shader} ShaderProgram Shader del edificio a crear.
    */
    getRoof(shader){
        var roof = new BuildingRoof();

        roof.setShaderProgram(shader);
        roof.build();

        return roof;
    }

    /**Escala el edificio según el tipo.
      * @param {type} integer Tipo del edificio.
      * @param {building} Building Objeto3D a escalar.
      * @param {roof} BuildingRoof Techo del edificio que se debe colocar arriba de todo.
    */
    modifyBuilding(type, building, roof){
        var x;
        switch (type) {
            case 1: x = 0.14; break;
            case 2: x = 0.29; break;
            case 3: x = 0.19; break;
            case 4: x = 0.09; break;
        }
        var y = this.getRandomY();
        var z = 0.25;

        building.translate(0, y/2, 0);
        building.scale(x, y, z);

        roof.translate(0, y, 0);
        roof.rotate(Math.PI/2, 1, 0, 0);
        roof.scale(x, z, 0);
    }
    /*Define una altura aleatoria entre 0.3 y 1 para los edificios.*/
    getRandomY(){
        var y = Math.random() + 0.45;
        if (y > 1.0) y = 1.0;
        return y;
    }
}
