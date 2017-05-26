class BuildingConstructor{
    /*Constructor de edificios de tipos diferentes*/
    constructor(){
        //Solo se instancia la clase
    }
    /**Crea un del tipo indicado.
      * @param {type} integer Tipo de edificio a crear.
      * @param {shader} ShaderProgram Shader del edificio a crear.
      * @param {color} Color Objeto de clase Color.
      * @param {number} float Indica el numero en el que debe empezar a construirse
    */
    getBuilding(type, towerShader, number){
        var building = new Container3D();
        building.setShaderProgram(towerShader);

        var roof = this.getRoof(towerShader, number);
        var body = this.getBody(type, towerShader, roof, number);

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
    getBody(type, shader, roof, number){
        var body = new Box(null, true, 0.5);
        body.setShaderProgram(shader);
        this.modifyBuilding(type, body, roof);
        body.build();

        /*Seleccion de textura*/
        var k = (Math.random())*10; //Se pasa al rango 0 al 9
        k = Math.floor(k); //Se le saca lo decimal
        switch (k) {
            case 0:
                body.id = 0.0; break;
            case 1:
                body.id = 1.0; break;
            case 8:
            case 2:
                body.id = 2.0; break;
            case 7:
            case 3:
                body.id = 3.0; break;
            case 4:
            case 9:
                body.id = 4.0; break;
            case 5:
            case 6:
                body.id = 5.0; break;
        }
        body.rotate(Math.PI/2.0, 1, 0, 0); //Para que quede "parado"
        
        body.lim = number;
        body.building = true;

        return body;
    }
    /**Crea el techo de un edificio.
      * @param {shader} ShaderProgram Shader del edificio a crear.
    */
    getRoof(shader, number){
        var roof = new BoxCover(null, true);

        roof.setShaderProgram(shader);
        roof.build();
        roof.lim = number;
        roof.building = true;
        roof.id = 20.0;

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
        building.x = x;
        building.y = y;

        //building.translate(0, y/2, 0);
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
