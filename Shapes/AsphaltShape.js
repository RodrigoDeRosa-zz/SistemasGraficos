class AsphaltShape extends Shape{
    /*Forma de las columnas*/
    constructor(levels){
        super(levels);
    }

    setPositions(){
        /*Es un segmento recto con dos mini diagonales en las puntas*/
        this.positions = [
            new Point(-1.05, 0, 0),
            new Point(-0.995, 0.06, 0),
            new Point(-0.075, 0.06, 0),
            new Point(-0.025, 0, 0),
            //Se repite corrido 1.2 en x
            new Point(0.025, 0, 0),
            new Point(0.075, 0.06, 0),
            new Point(0.995, 0.06, 0),
            new Point(1.05, 0, 0)
        ]
    }
    setNormals(){
        var norm = new Point(0, 1, 0);
        this.normals = [norm, norm, norm, norm, norm, norm, norm, norm];
    }
    setTangents(){
        /*Suponemos que estan a 45° las diagonales*/
        var t0 = new Point(1, 1, 0);
        var t1 = new Point(1, 0, 0);
        var t2 = new Point(1, 0, 0);
        var t3 = new Point(-1, -1, 0);
        this.tangents = [ t0, t1, t2, t3, t0, t1, t2, t3];
    }
}
