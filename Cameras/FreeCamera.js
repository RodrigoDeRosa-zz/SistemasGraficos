class FreeCamera extends Camera{
	constructor(){
		super();
		this.height = null;
	}
	initialise(){
        if(!this.height){
			vec3.set(this.eyePoint, 0, 3, 0);//Se ubica en el piso a una altura fija
			this.height = 0.5;
		}
	    vec3.set(this.upVec, 0, 1, 0);
		this.sensibility = 0.001;
		this.moveScale = 0.5;
		this.rollSensitivity = 0.01;
		this.theta = 3*Math.PI/4;
		this.phi = Math.PI/2;

		var lookX = 500*Math.sin(this.theta)*Math.sin(this.phi);
        var lookY = 500*Math.cos(this.phi);
        var lookZ = 500*Math.cos(this.theta)*Math.sin(this.phi);

		vec3.set(this.lookAtVec, lookX, lookY, lookZ);

        this.setRight();
	}
	setHeight(height){
		this.height = height;
		vec3.set(this.eyePoint, this.eyePoint[0], height, this.eyePoint[2]);
		this.setRight();
	}

	tick(){
        if (mouseDown) this.rotate();
	}

	rotate(){
		var deltaX = mouse.x - previousClientX;
        var deltaY = mouse.y - previousClientY;

        previousClientX = mouse.x;
        previousClientY = mouse.y;

		this.theta += deltaX * this.sensibility;
    	this.phi += deltaY * this.sensibility;

        if (this.phi<=0) this.phi = 0.001;
        if (this.phi>Math.PI) this.phi=Math.PI;

		var lookX = 1000*Math.sin(this.theta)*Math.sin(this.phi);
        var lookY = 1000*Math.cos(this.phi);
        var lookZ = 1000*Math.cos(this.theta)*Math.sin(this.phi);

		vec3.set(this.lookAtVec, lookX, lookY, lookZ);
        this.setRight();
	}

	setRight(){
        vec3.cross(this.rightVec, this.lookAtVec, [0, 1, 0]);//Deberia ser up pero si no es 0,1,0 se moveria
        												  //raro para los costados y para adelante
        vec3.normalize(this.rightVec, this.rightVec);
	}

	rollLeft(){
		var rotateMatrix = mat4.create();
		var normLookAt = vec3.create();
		vec3.normalize(normLookAt, this.lookAtVec);
		mat4.rotate(rotateMatrix, rotateMatrix, -10*this.rollSensibility, normLookAt);
		vec3.transformMat4(this.upVec, this.upVec, rotateMatrix);
	}

	rollRight(){
		var rotateMatrix = mat4.create();
		var normLookAt = vec3.create();
		vec3.normalize(normLookAt, this.lookAtVec);
		mat4.rotate(rotateMatrix, rotateMatrix, 10*this.rollSensibility, normLookAt);
		vec3.transformMat4(this.upVec, this.upVec, rotateMatrix);
	}

	moveForward(){
		var auxAt = vec3.create();
		var move = vec3.create();
		vec3.scale(auxAt, this.lookAtVec, this.sensibility);
		vec3.set(move, auxAt[0], 0, auxAt[2]);
		vec3.add(this.eyePoint, this.eyePoint, move);
		vec3.add(this.lookAtVec, this.lookAtVec, move);
		this.setRight();
	}

	moveBack(){
		var auxAt = vec3.create();
		var move = vec3.create();
		vec3.scale(auxAt, this.lookAtVec, this.sensibility);
		vec3.set(move, auxAt[0], 0, auxAt[2]);
		vec3.subtract(this.eyePoint, this.eyePoint, move);
		vec3.subtract(this.lookAtVec, this.lookAtVec, move);
		this.setRight();
	}

	moveRight(){
		var auxRight = vec3.create();
		vec3.scale(auxRight, this.rightVec, this.moveScale);
		vec3.add(this.eyePoint, this.eyePoint, auxRight);
		vec3.add(this.lookAtVec, this.lookAtVec, auxRight);
		this.setRight();
	}

	moveLeft(){
		var auxRight = vec3.create();
		vec3.scale(auxRight, this.rightVec, this.moveScale);
		vec3.subtract(this.eyePoint, this.eyePoint, auxRight);
		vec3.subtract(this.lookAtVec, this.lookAtVec, auxRight);
		this.setRight();
	}
}
