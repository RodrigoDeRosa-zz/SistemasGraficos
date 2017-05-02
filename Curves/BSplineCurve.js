/*Curva de BSpline de orden 3*/
class CubicBSpline extends Curve{
    constructor(){
        super();
        this.setBasis();
        this.setdBasis();
    }
    /*Define las bases de Bernstein de la curva*/
    setBasis(){
        var B0 = function(u){ return (1-3*u+3*u*u-u*u*u)/6;}
        var B1 = function(u){ return (4-6*u*u+3*u*u*u)/6;}
        var B2 = function(u){ return (1+3*u+3*u*u-3*u*u*u)/6;}
        var B3 = function(u){ return (u*u*u)/6;}
        this.basis = [B0, B1, B2, B3];
    }
    /*Define las bases de Bernstein derivadas de la curva*/
    setdBasis(){
        var dB0 = function(u) { return (-3+6*u-3*u*u)/6;}
        var dB1 = function(u) { return (-12*u+9*u*u)/6;}
        var dB2 = function(u) { return (3+6*u-9*u*u)/6;}
        var dB3 = function(u) { return (3*u*u)/6;}
        this.dBasis = [dB0, dB1, dB2, dB3];
    }
}
/*Curva de BSpline de orden 2*/
class QuadraticBSpline extends Curve{
    constructor(){
        super();
        this.setBasis();
        this.setdBasis();
    }
    /*Define las bases de Bernstein de la curva*/
    setBasis(){
        var B0 = function(u) { return 0.5*(u*u-2*u+1);}
        var B1 = function(u) { return 0.5*(-2*u*u+2*u+1); }
        var B2 = function(u) { return 0.5*u*u;}
        this.basis = [B0, B1, B2];
    }
    /*Define las bases de Bernstein derivadas de la curva*/
    setdBasis(){
        var dB0 = function(u) { return (u-1);}
        var dB1 = function(u) { return -2*u + 1;}
        var dB2 = function(u) { return u;}
        this.dBasis = [dB0, dB1, dB2];
    }
}
/*Curva de BSpline de orden 1*/
class LinearBSpline extends Curve{
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
