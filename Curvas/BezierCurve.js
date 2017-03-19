/*Curva de bezier de orden 3*/
class CubicBezier extends Curve{
    constructor(){
        super();
        this.setBasis();
        this.setdBasis();
    }
    /*Define las bases de Bernstein de la curva*/
    setBasis(){
        var B0 = function(u){ return (1-u)*(1-u)*(1-u);}
        var B1 = function(u){ return 3*(1-u)*(1-u)*u;}
        var B2 = function(u){ return 3*(1-u)*u*u;}
        var B3 = function(u){ return u*u*u;}
        this.basis = [B0, B1, B2, B3];
    }
    /*Define las bases de Bernstein derivadas de la curva*/
    setdBasis(){
        var dB0 = function(u) { return -3*u*u+6*u-3;}
        var dB1 = function(u) { return 9*u*u-12*u+3;}
        var dB2 = function(u) { return -9*u*u+6*u;}
        var dB3 = function(u) { return 3*u*u;}
        this.dBasis = [dB0, dB1, dB2, dB3];
    }
}
/*Curva de bezier de orden 2*/
class QuadraticBezier extends Curve{
    constructor(){
        super();
        this.setBasis();
        this.setdBasis();
    }
    /*Define las bases de Bernstein de la curva*/
    setBasis(){
        var B0 = function(u) { return (1-u)*(1-u);}
        var B1 = function(u) { return 2*(1-u)*u; }
        var B2 = function(u) { return u*u;}
        this.basis = [B0, B1, B2];
    }
    /*Define las bases de Bernstein derivadas de la curva*/
    setdBasis(){
        var dB0 = function(u) { return 2*(u-1);}
        var dB1 = function(u) { return 2 - 4*u;}
        var dB2 = function(u) { return 2*u;}
        this.dBasis = [dB0, dB1, dB2];
    }
}
/*Curva de bezier de orden 1*/
class LinearBezier extends Curve{
    constructor(){
        super();
        this.setBasis();
        this.setdBasis();
    }
    /*Define las bases de Bernstein de la curva*/
    setBasis(){
        var B0 = function(u) { return (1-u);}
    	var B1 = function(u) { return u; }
    	this.basis = [B0, B1];
    }
    /*Define las bases de Bernstein derivadas de la curva*/
    setdBasis(){
        var dB0 = function(u) { return -1;}
    	var dB1 = function(u) { return 1;}
    	this.dBasis = [dB0, dB1];
    }
}
