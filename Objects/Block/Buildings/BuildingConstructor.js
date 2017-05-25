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
    getBuilding(type, towerShader, roofShader, color){
        var building = new Container3D();
        building.setShaderProgram(roofShader);

        var roof = this.getRoof(roofShader);
        var body = this.getBody(type, towerShader, color, roof);

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
        var body = new Box(null, true);
        body.setShaderProgram(shader);
        body.build();
        body.building = true;
        //TODO: esto debe ser decidido en el shader
        var k = (Math.random())*10; //Se pasa al rango 0 al 9
        k = Math.floor(k); //Se le saca lo decimal
        switch (k) {
            case 0:
            case 3:
            case 9:
                body.id = 0.0; break;
            case 1:
            case 4:
            case 8:
            case 6:
                body.id = 1.0; break;
            case 2:
            case 5:
            case 7:
                body.id = 2.0; break;
        }

        this.modifyBuilding(type, body, roof);
        body.rotate(Math.PI/2.0, 1, 0, 0); //Para que quede "parado"

        return body;
    }
    /**Crea el techo de un edificio.
      * @param {shader} ShaderProgram Shader del edificio a crear.
    */
    getRoof(shader){
        var roof = new BoxCover();

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
