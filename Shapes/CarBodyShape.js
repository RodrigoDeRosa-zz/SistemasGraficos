class CarBodyShape extends Shape{
    /*Forma de la parte inferior de un auto*/
    constructor(levels){
        super(levels);
    }
    setPositions(){
        var p0 = new Point(-0.488, 0, 0);
        var p1 = new Point(0.489, 0, 0);
        var p2 = new Point(0.489, 0.183, 0);
        var p3 = new Point(0.389, 0.198, 0);
        var p4 = new Point(0.243, 0.271, 0);
        var p5 = new Point(0.145, 0.290, 0);
        var p6 = new Point(-0.040, 0.283, 0);
        var p7 = new Point(-0.090, 0.267, 0);
        var p8 = new Point(-0.215, 0.175, 0);
        var p9 = new Point(-0.441, 0.147, 0);
        var p10 = new Point(-0.466, 0.127, 0);
        var p11 = new Point(-0.488, 0.08, 0);
        /*Se repiten por el facetado*/
        this.positions = [
            p0,
            p1, p1,
            p2, p2,
            p3, p3,
            p4, p4,
            p5, p5,
            p6, p6,
            p7, p7,
            p8, p8,
            p9, p9,
            p10, p10,
            p11, p11,
            p0
        ];
    }
    setNormals(){
        var up = new Point(0, 1, 0);
        var down = new Point(0, -1, 0);
        var left = new Point(-1, 0, 0);
        var right = new Point(1, 0, 0);
        var n23 = new Point(0.1, 1, 0);
        var n34 = new Point(0.4, 1, 0);
        var n45 = new Point(0.19, 1, 0);
        var n56 = up;
        var n67 = new Point(-0.48, 1, 0);
        var n78 = new Point(-0.736, 1, 0);
        var n89 = new Point(-0.13, 1, 0);
        var n910 = new Point(-1, 0.75, 0);
        var n1011 = new Point(-1, 0.47, 0);
        /*Se repiten por el facetado*/
        this.normals = [
            down,
            down, right,
            right, n23,
            n23, n34,
            n34, n45,
            n45, n56,
            n56, n67,
            n67, n78,
            n78, n89,
            n89, n910,
            n910, n1011,
            n1011, left,
            left
        ];
    }
    setTangents(){
        var up = new Point(0, 1, 0);
        var down = new Point(0, -1, 0);
        var left = new Point(-1, 0, 0);
        var right = new Point(1, 0, 0);
        var t23 = new Point(-1, 0.1, 0);
        var t34 = new Point(-1, 0.4, 0);
        var t45 = new Point(-1, 0.19, 0);
        var t56 = left;
        var t67 = new Point(-1, -0.48, 0);
        var t78 = new Point(-1, -0.736, 0);
        var t89 = new Point(-1, -0.13, 0);
        var t910 = new Point(-0.75, -1, 0);
        var t1011 = new Point(-0.47, -1, 0);
        /*Se repiten por el facetado*/
        this.tangents = [
            right,
            right, up,
            up, t23,
            t23, t34,
            t34, t45,
            t45, t56,
            t56, t67,
            t67, t78,
            t78, t89,
            t89, t910,
            t910, t1011,
            t1011, down,
            down
        ];
    }
}
