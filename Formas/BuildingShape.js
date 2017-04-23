class BuildingShape extends Shape{
    /**Forma de los edificios.
     * @param {type} integer Tipo de edificio cuya forma se espera. (Edificio 1, 2, etc.)
    */
    constructor(type){
        var SHAPE_POINTS = 8;
        //Las normales y tangentes son identicas para todo tipo de edificio
        super(SHAPE_POINTS, [false, true, true]);
        this.setPositions(type);
    }

    /**Define las posiciones del edificio dependiendo el tipo.
     * @param {type} integer Tipo de edificio cuyas posiciones se requieren
    */
    setPositions(type){
        switch (type) {
            case 1:
                this.positionsType1();
                break;
            case 2:
                this.positionsType2();
                break;
            case 3:
                this.positionsType3();
                break;
            case 4:
                this.positionsType4();
                break;
            default:
                this.positionsType1(); //El edificio de tipo 1 es el default
        }
    }
    /*Devuelve las posiciones del edificio de tipo 1*/
    positionsType1(){
        var p0 = new Point(-0.5, -0.5, 0);
        var p1 = new Point(0.5, -0.5, 0);
        var p2 = new Point(0.5, 0.5, 0);
        var p3 = new Point(-0.5, 0.5, 0);
        //Se repiten para obtener efecto facetado
        this.setSquare(p0, p1, p2, p3);
    }
    /*Devuelve las posiciones del edificio de tipo 2*/
    positionsType2(){
        var p0 = new Point(-0.5, -0.25, 0);
        var p1 = new Point(0.5, -0.25, 0);
        var p2 = new Point(0.5, 0.25, 0);
        var p3 = new Point(-0.5, 0.25, 0);
        //Se repiten para obtener efecto facetado
        this.setSquare(p0, p1, p2, p3);
    }
    positionsType3(){
        var p0 = new Point(-0.5, -0.25, 0);
        var p1 = new Point(0.5, -0.25, 0);
        var p2 = new Point(0.5, 0.25, 0);
        var p3 = new Point(-0.5, 0.25, 0);
        //Se repiten para obtener efecto facetado
        this.setSquare(p0, p1, p2, p3);
    }
    positionsType4(){
        var p0 = new Point(-0.5, -0.25, 0);
        var p1 = new Point(0.5, -0.25, 0);
        var p2 = new Point(0.5, 0.25, 0);
        var p3 = new Point(-0.5, 0.25, 0);
        //Se repiten para obtener efecto facetado
        this.setSquare(p0, p1, p2, p3);
    }
    setSquare(p0, p1, p2, p3){
        this.positions = [
            p0, p1,
            p1, p2,
            p2, p3,
            p3, p0
        ];
    }

    setNormals(){
        var up = new Point(0, 1, 0);
        var down = new Point(0, -1, 0);
        var right = new Point(1, 0, 0);
        var left = new Point(-1, 0, 0);
        //Se repiten para obtener efecto facetado
        this.normals = [
            down, down,
            right, right,
            up, up,
            left, left
        ];
    }

    setTangents(){
        var up = new Point(0, 1, 0);
        var down = new Point(0, -1, 0);
        var right = new Point(1, 0, 0);
        var left = new Point(-1, 0, 0);
        //Se repiten para obtener efecto facetado
        this.tangents = [
            right, right,
            up, up,
            left, left,
            down, down
        ];
    }
}
