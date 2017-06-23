class CarRoofShape extends Shape{
    /*Forma de la parte inferior de un auto*/
    constructor(levels){
        super(levels);
    }
    setPositions(){
        var bottomLeft = new Point(-0.35, 0.2, 0);
        var bottomRight = new Point(0.35, 0.2, 0);
        var topRight = new Point(0.1, 0.35, 0);
        var topLeft = new Point(-0.3, 0.35, 0);
        /*Se repiten por el facetado*/
        this.positions = [
            bottomLeft,
            bottomRight, bottomRight,
            topRight, topRight,
            topLeft, topLeft,
            bottomLeft
        ];
    }
    setNormals(){
        var up = new Point(0, 1, 0);
        var down = new Point(0, -1, 0);
        var diagRight = new Point(0.5, 1, 0);
        var diagLeft = new Point(-0.5, 1, 0);
        /*Se repiten por el facetado*/
        this.normals = [
            down,
            down, diagRight,
            diagRight, up,
            up, diagLeft,
            diagLeft
        ];
    }
    setTangents(){
        var left = new Point(-1, 0, 0);
        var right = new Point(1, 0, 0);
        var diagRight = new Point(-0.5, 1, 0);
        var diagLeft = new Point(-0.5, -1, 0);
        /*Se repiten por el facetado*/
        this.tangents = [
            right,
            right, diagRight,
            diagRight, left,
            left, diagLeft,
            diagLeft
        ];
    }
}
