class ConcreteShape extends Shape{
    /*Forma de las columnas*/
    constructor(levels){
        super(levels);
    }
    setPositions(){
        /*La forma se recorre desde bottomleft y se da la vuelta.
         *Se repiten puntos para lograr facetado.
        */
        var bottomLeft = new Point(-1.06, -0.05, 0);
        var bottomRight = new Point(-0.01, -0.05, 0);
        var topRightExterior = new Point(-0.01, 0.1, 0);
        var topRightInterior = new Point(-0.035, 0.1, 0);
        var midRight = new Point(-0.085, 0.05, 0);
        var midLeft = new Point(-0.985, 0.05, 0);
        var topLeftInterior = new Point(-1.035, 0.1, 0);
        var topLeftExterior = new Point(-1.06, 0.1, 0);
        //Misma forma corrida 1.2 en x
        var bottomLeft2 = new Point(0.01, -0.05, 0);
        var bottomRight2 = new Point(1.06, -0.05, 0);
        var topRightExterior2 = new Point(1.06, 0.1, 0);
        var topRightInterior2 = new Point(1.035, 0.1, 0);
        var midRight2 = new Point(0.985, 0.05, 0);
        var midLeft2 = new Point(0.085, 0.05, 0);
        var topLeftInterior2 = new Point(0.035, 0.1, 0);
        var topLeftExterior2 = new Point(0.01, 0.1, 0);

        this.positions = [
            bottomLeft,
            bottomRight, bottomRight,
            topRightExterior, topRightExterior,
            topRightInterior, topRightInterior,
            midRight, midRight,
            midLeft, midLeft,
            topLeftInterior, topLeftInterior,
            topLeftExterior, topLeftExterior,
            bottomLeft, //bottomLeft,
            bottomLeft2,
            bottomRight2, bottomRight2,
            topRightExterior2, topRightExterior2,
            topRightInterior2, topRightInterior2,
            midRight2, midRight2,
            midLeft2, midLeft2,
            topLeftInterior2, topLeftInterior2,
            topLeftExterior2, topLeftExterior2,
            bottomLeft2
        ];
    }
    setNormals(){
        var down = new Point(0, -1, 0);
        var up = new Point(0, 1, 0);
        var right = new Point(1, 0, 0);
        var left = new Point(-1, 0, 0);
        var diagLeft = new Point(-1, 1, 0);
        var diagRight = new Point(1, 1, 0);
        this.normals = [
            down,
            down, right,
            right, up,
            up, diagLeft,
            diagLeft, up,
            up, diagRight,
            diagRight, up,
            up, left,
            down,
            //down,
            down,
            down, right,
            right, up,
            up, diagLeft,
            diagLeft, up,
            up, diagRight,
            diagRight, up,
            up, left,
            down
        ];
    }
    setTangents(){
        /*Suponemos que estan a 45° las diagonales*/
        var down = new Point(0, -1, 0);
        var up = new Point(0, 1, 0);
        var right = new Point(1, 0, 0);
        var left = new Point(-1, 0, 0);
        var diagDown = new Point(-1, -1, 0);
        var diagUp = new Point(-1, 1, 0);
        this.tangents = [
            right,
            right, up,
            up, left,
            left, diagDown,
            diagDown, left,
            left, diagUp,
            diagUp, left,
            left, down,
            down,
            //right,
            right,
            right, up,
            up, left,
            left, diagDown,
            diagDown, left,
            left, diagUp,
            diagUp, left,
            left, down,
            down,
        ];
    }
}
