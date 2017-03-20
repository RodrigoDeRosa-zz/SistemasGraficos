/*Inicia el glProgram y los shaders*/
function webGLStart(){
    var mainCanvas = document.getElementById("mainCanvas");
    initGL(mainCanvas);
    initShader();
    setButtons();
    
    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.enable(gl.DEPTH_TEST);

    cameraController = new CameraController();
    var orbit = new OrbitCamera();
    orbit.setRadius(100);
    cameraController.addCamera(orbit);
    cameraController.init();

    createScene();

    tick();
}
/**Inicializa GL.
  * @param {canvas} HTMLCanvas
*/
function initGL(canvas){
    try{
        gl = canvas.getContext("experimental-webgl");
        gl.viewportWidth = canvas.width;
        gl.viewportHeight = canvas.height;
    } catch(e){}
    if(!gl){
        alert("ERROR: Could not initialise WebGL.");
    }
}
/**Genera y devuelve el mShaderProgram.
  * @param {gl} GLProgram
  * @param {id} string Identificador del shader a obtener
*/
function getShader(gl, id){
    var shaderScript = document.getElementById(id);
    if(!shaderScript) return null;

    var str = "";
    var k = shaderScript.firstChild;
    while(k){
        if(k.nodeType == 3) str += k.textContent;
        k = k.nextSibling;
    }

    var shader;
    if (shaderScript.type == "x-shader/x-fragment") shader = gl.createShader(gl.FRAGMENT_SHADER);
    else if (shaderScript.type == "x-shader/x-vertex") shader = gl.createShader(gl.VERTEX_SHADER);
    else return nulll;

    gl.shaderSource(shader, str);
    gl.compileShader(shader);

    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)){
        alert(gl.getShaderInfoLog(shader));
        return null;
    }
    return shader;
}
/*Inicializa el mShaderProgram*/
function initShader(){
    //Se crean los shaders de fragment y vertex
    var fragmentShader = getShader(gl, "shader-fs");
    var vertexShader = getShader(gl, "shader-vs");
    //Se crea el mShaderProgram linkeandole los fragment y vertex shaders
    mShaderProgram = gl.createProgram();
    gl.attachShader(mShaderProgram, vertexShader);
    gl.attachShader(mShaderProgram, fragmentShader);
    gl.linkProgram(mShaderProgram);
    if(!gl.getProgramParameter(mShaderProgram, gl.LINK_STATUS)) alert("Could not initialise shaders");
    //Se linkean los atributos de los vertices
    //Posicion
    mShaderProgram.vertexPositionAttribute = gl.getAttribLocation(mShaderProgram, "aVertexPosition");
    gl.enableVertexAttribArray(mShaderProgram.vertexPositionAttribute);
    //Normal
    mShaderProgram.vertexNormalAttribute = gl.getAttribLocation(mShaderProgram, "aVertexNormal");
    gl.enableVertexAttribArray(mShaderProgram.vertexNormalAttribute);
    //Color
    mShaderProgram.vertexColorAttribute = gl.getAttribLocation(mShaderProgram, "aVertexColor");
    gl.enableVertexAttribArray(mShaderProgram.vertexColorAttribute);
    //Se linkea el resto de las variables
    mShaderProgram.pMatrixUniform = gl.getUniformLocation(mShaderProgram, "uPMatrix");
    mShaderProgram.ViewMatrixUniform = gl.getUniformLocation(mShaderProgram, "uViewMatrix");
    mShaderProgram.ModelMatrixUniform = gl.getUniformLocation(mShaderProgram, "uModelMatrix");
    mShaderProgram.nMatrixUniform = gl.getUniformLocation(mShaderProgram, "uNMatrix");
    mShaderProgram.samplerUniform = gl.getUniformLocation(mShaderProgram, "uSampler");
    mShaderProgram.useLightingUniform = gl.getUniformLocation(mShaderProgram, "uUseLighting");
    mShaderProgram.ambientColorUniform = gl.getUniformLocation(mShaderProgram, "uAmbientColor");
    mShaderProgram.lightingDirectionUniform = gl.getUniformLocation(mShaderProgram, "uLightPosition");
    mShaderProgram.directionalColorUniform = gl.getUniformLocation(mShaderProgram, "uDirectionalColor");
}
