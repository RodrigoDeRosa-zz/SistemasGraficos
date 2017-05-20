class CarBodyShape extends Shape{
    /*Forma de la parte inferior de un auto*/
    constructor(levels){
        super(levels);
    }
    setPositions(){
        var bottomLeft = new Point(-0.5, 0, 0);
        var bottomRight = new Point(0.5, 0, 0);
        var topExteriorRight = new Point(0.5, 0.15, 0);
        var topInteriorRight = new Point(0.15, 0.2, 0);
        var topInteriorLeft = new Point(-0.35, 0.2, 0);
        var topExteriorLeft = new Point(-0.5, 0.15, 0);
        /*Se repiten por el facetado*/
        this.positions = [
            bottomLeft,
            bottomRight, bottomRight,
            topExteriorRight, topExteriorRight,
            topInteriorRight, topInteriorRight,
            topInteriorLeft, topInteriorLeft,
            topExteriorLeft, topExteriorLeft,
            bottomLeft
        ];
    }
    setNormals(){
        var up = new Point(0, 1, 0);
        var down = new Point(0, -1, 0);
        var left = new Point(-1, 0, 0);
        var right = new Point(1, 0, 0);
        var diagRight = new Point(0.2, 1, 0);
        var diagLeft = new Point(-0.33, 1, 0);
        /*Se repiten por el facetado*/
        this.normals = [
            down,
            down, right,
            right, diagRight,
            diagRight, up,
            up, diagLeft,
            diagLeft, left,
            left
        ];
    }
    setTangents(){
        var up = new Point(0, 1, 0);
        var down = new Point(0, -1, 0);
        var left = new Point(-1, 0, 0);
        var right = new Point(1, 0, 0);
        var diagRight = new Point(-1, 0.2, 0);
        var diagLeft = new Point(-1, -0.33, 0);
        /*Se repiten por el facetado*/
        this.tangents = [
            right,
            right, up,
            up, diagRight,
            diagRight, left,
            left, diagLeft,
            diagLeft, down,
            down
        ];
    }
}
