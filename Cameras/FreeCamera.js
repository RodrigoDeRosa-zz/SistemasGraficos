function FreeCamera(terrainLength, bridgePos){
	this.eyePoint = vec3.create();

	this.lookAtVec = vec3.create();
	this.right = vec3.create();
	this.upPoint = vec3.create();

	this.matrix = mat4.create();

	this.initialise = function(){
        vec3.set(this.eyePoint, 0, 8, 0);//Se ubica en el puente a una altura fija
 		vec3.set(this.lookAtVec, 1000, 8, 0);
        vec3.set(this.upPoint, 0, 1, 0);
        this.setRight();
	}

	this.setHeight = function(height){
		vec3.set(this.eyePoint, this.eyePoint[0], height-height*(height/10)*0.2, this.eyePoint[2]);
		vec3.set(this.lookAtVec, this.lookAtVec[0], height-height*(height/10)*0.2, this.lookAtVec[2]);
		this.setRight();
	}

	var sensibility = 0.01, moveScale = 2, rollSens = 0.001;
	var theta = 0, phi = 0, prevP = 0, prevT = 0;

	this.tick = function(){
        if (mouseDown) this.rotate();
	}

	this.rotate = function(){
		var deltaX = mouse.x - previousClientX;
        var deltaY = mouse.y - previousClientY;

        previousClientX = mouse.x;
        previousClientY = mouse.y;

        theta += deltaX * rollSens;
        phi += deltaY * rollSens;

        if (phi<=0) phi = 0.001;
        if (phi>Math.PI) phi=Math.PI;

        this.lookAtVec = [1000*Math.sin(prevT + theta)*Math.sin(prevP + phi),
            100*Math.cos(prevP + phi), 1000*Math.cos(prevT + theta)*Math.sin(prevP + phi)];

        prevT = theta;
        prevP = phi;

        this.setRight();
	}

	this.setRight = function(){
        vec3.cross(this.right, this.lookAtVec, [0, 1, 0]);//Deberia ser up pero si no es 0,1,0 se moveria
        												  //raro para los costados y para adelante
        vec3.normalize(this.right, this.right);
	}

	this.rollLeft = function(){
		var rotateMatrix = mat4.create();
		var normLookAt = vec3.create();
		vec3.normalize(normLookAt, this.lookAtVec);
		mat4.rotate(rotateMatrix, rotateMatrix, -10*sensibility, normLookAt);
		vec3.transformMat4(this.upPoint, this.upPoint, rotateMatrix);
	}

	this.rollRight = function(){
		var rotateMatrix = mat4.create();
		var normLookAt = vec3.create();
		vec3.normalize(normLookAt, this.lookAtVec);
		mat4.rotate(rotateMatrix, rotateMatrix, 10*sensibility, normLookAt);
		vec3.transformMat4(this.upPoint, this.upPoint, rotateMatrix);
	}

	this.moveForward = function(){
		var auxAt = vec3.create();
		var move = vec3.create();
		vec3.scale(auxAt, this.lookAtVec, sensibility);
		vec3.set(move, auxAt[0], 0, auxAt[2]);
		vec3.add(this.eyePoint, this.eyePoint, move);
		vec3.add(this.lookAtVec, this.lookAtVec, move);
		this.setRight();
	}

	this.moveBack = function(){
		var auxAt = vec3.create();
		var move = vec3.create();
		vec3.scale(auxAt, this.lookAtVec, sensibility);
		vec3.set(move, auxAt[0], 0, auxAt[2]);
		vec3.subtract(this.eyePoint, this.eyePoint, move);
		vec3.subtract(this.lookAtVec, this.lookAtVec, move);
		this.setRight();
	}

	this.moveRight = function(){
		var auxRight = vec3.create();
		vec3.scale(auxRight, this.right, moveScale);
		vec3.add(this.eyePoint, this.eyePoint, auxRight);
		vec3.add(this.lookAtVec, this.lookAtVec, auxRight);
		this.setRight();
	}

	this.moveLeft = function(){
		var auxRight = vec3.create();
		vec3.scale(auxRight, this.right, moveScale);
		vec3.subtract(this.eyePoint, this.eyePoint, auxRight);
		vec3.subtract(this.lookAtVec, this.lookAtVec, auxRight);
		this.setRight();
	}

	this.initialise();
}
