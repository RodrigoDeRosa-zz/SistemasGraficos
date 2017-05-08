class ColumnShape extends Shape{
    /*Forma de las columnas*/
    constructor(levels){
        super(levels, [false, false, false]);

        this.p0 = new Point(0.3, 0, 0);
        this.p1 = new Point(0.3, 0.15, 0);
        this.p2 = new Point(0.10, 0.15, 0);
        this.curve1 = new QuadraticBezierPath([this.p0, this.p1, this.p2]);

        this.p3 = new Point(0.10, 0.8, 0);
        this.p4 = new Point(0.325, 0.85, 0);
        this.p5 = new Point(0.5, 0.9, 0);
        this.curve2 = new QuadraticBezierPath([this.p3, this.p4, this.p5]);

        this.setPositions(); this.setNormals(); this.setTangents();
    }

    setPositions(){
        /*Se almacenan las posiciones de la curva de abajo de todo*/
        var deltaU = 0.1;
        for (var u = 0.0; u < 1.0; u += deltaU){
            this.positions.push(this.curve1.getPosition(u));
        }
        console.log(this.positions.length);
        /*Y ahora se le agregan los vertices del segmento recto central*/
        this.positions.push(this.p2);
        this.positions.push(new Point(0.10, 0.45, 0));
        this.positions.push(this.p3);
        console.log(this.positions.length);
        /*Ahora se agrega el segmento diagonal*/
        deltaU = 0.25;
        for (var u = 0.0; u < 1.0; u += deltaU){
            this.positions.push(this.curve2.getPosition(u));
        }
        console.log(this.positions.length);
        /*Y ahora el ultimo segmento recto*/
        this.positions.push(this.p5);
        this.positions.push(new Point(0.5, 0.95, 0));
        this.positions.push(new Point(0.5, 1.0, 0));
        console.log(this.positions.length);
    }
    setNormals(){
        var zPos = new Point(1, 0, 0);
        /*Se almacenan las posiciones de la curva de abajo de todo*/
        var deltaU = 0.1;
        for (var u = 0.0; u < 1.0; u += deltaU){
            this.normals.push(this.curve1.getNormal(u));
        }
        /*Y ahora se le agregan los vertices del segmento recto central*/
        this.normals.push(zPos);
        this.normals.push(zPos);
        this.normals.push(zPos);
        /*Ahora se agrega el segmento diagonal*/
        deltaU = 0.25;
        for (var u = 0.0; u < 1.0; u += deltaU){
            var normal = this.curve2.getNormal(u);
            this.normals.push(new Point(normal.x, -normal.y, normal.z));
        }
        /*Y ahora el ultimo segmento recto*/
        this.normals.push(zPos);
        this.normals.push(zPos);
        this.normals.push(zPos);
    }
    setTangents(){
        var yPos = new Point(0, 1, 0);
        /*Se almacenan las posiciones de la curva de abajo de todo*/
        var deltaU = 0.1;
        for (var u = 0.0; u < 1.0; u += deltaU){
            this.tangents.push(this.curve1.getTangent(u));
        }
        /*Y ahora se le agregan los vertices del segmento recto central*/
        this.tangents.push(yPos);
        this.tangents.push(yPos);
        this.tangents.push(yPos);
        /*Ahora se agrega el segmento diagonal*/
        deltaU = 0.25;
        for (var u = 0.0; u < 1.0; u += deltaU){
            this.tangents.push(this.curve2.getTangent(u));
        }
        /*Y ahora el ultimo segmento recto*/
        this.tangents.push(yPos);
        this.tangents.push(yPos);
        this.tangents.push(yPos);
    }
}
