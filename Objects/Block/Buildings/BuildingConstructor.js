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

        /*Seleccion de textura*/
        var k = (Math.random())*20; //Se pasa al rango 0 al 19
        k = Math.floor(k); //Se le saca lo decimal
        body.id = k; //Se define el tipo de edificio
        switch (k){ //Se definen las escalas de las texturas segun el tipo
            case 0: body.y = 0.74 - 0.25*Math.floor(Math.random()*3); this.scaleXLow = 0.5; break;
            case 1: body.y = 0.85 - 0.25*Math.floor(Math.random()*3); this.scaleXLow = 0.5; break;
            case 2: body.y = 0.85 - 0.25*Math.floor(Math.random()*3); this.scaleYTop = 0.5; break;
            case 3: body.y = 0.85 - 0.25*Math.floor(Math.random()*3); this.scaleXLow = 0.25; break;
            case 4: body.y = 1.3 - 0.25*Math.floor(Math.random()*4); this.scaleYTop = 0.5; break;
            case 5: body.y = 0.85 - 0.25*Math.floor(Math.random()*3); this.scaleYTop = 0.5; this.scaleXLow = 0.25; break;
            case 6: body.y = 1.35 - 0.25*Math.floor(Math.random()*4); this.scaleXLow = 0.25; break;
            case 7: body.y = 1.1 - 0.25*Math.floor(Math.random()*4); this.scaleXLow = 0.5; break;
            case 8: body.y = 1.105 - 0.25*Math.floor(Math.random()*4); this.scaleXLow = 0.25; break;
            case 9: body.y = 1.35 - 0.25*Math.floor(Math.random()*4); this.scaleYTop = 0.5; this.scaleXLow = 0.5; break;
            case 10: body.y = 1.1 - 0.25*Math.floor(Math.random()*4); this.scaleXLow = 0.25; break;
            case 11: body.y = 1.35 - 0.25*Math.floor(Math.random()*4); this.scaleYTop = 0.5; this.scaleXLow = 0.25; break;
            case 12: body.y = 1.35 - 0.25*Math.floor(Math.random()*4); this.scaleYTop = 0.5; this.scaleXLow = 0.5; break;
            case 13: body.y = 1.1 - 0.25*Math.floor(Math.random()*4); this.scaleXLow = 0.5; break;
            case 14: body.y = 1.1 - 0.25*Math.floor(Math.random()*4); this.scaleXLow = 0.25; break;
            case 15: body.y = 1.1 - 0.25*Math.floor(Math.random()*4); this.scaleXLow = 0.25; break;
            case 16: body.y = 0.85 - 0.25*Math.floor(Math.random()*3); this.scaleXLow = 0.25; break;
            case 17: body.y = 1.35 - 0.25*Math.floor(Math.random()*4); this.scaleXTop = 0.5; this.scaleXLow = 0.5; break;
            case 18: body.y = 1.1 - 0.25*Math.floor(Math.random()*4); break; //Es 1x1 en ambos
            case 19: body.y = 1.35 - 0.25*Math.floor(Math.random()*4); this.scaleYTop = 0.5; this.scaleXLow = 0.5; break;
        }

        this.modifyBuilding(type, body, roof);
        body.build();
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
        roof.scaleYTop = -1.0;

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
        var z = 0.25;
        building.x = x;

        building.scale(x, building.y, z);

        roof.translate(0, building.y, 0);
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
