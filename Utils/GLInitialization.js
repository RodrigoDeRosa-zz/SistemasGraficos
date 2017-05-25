/*Inicia el glProgram y los shaders*/
function webGLStart(){
    var mainCanvas = document.getElementById("mainCanvas");
    initGL(mainCanvas);
    /*Se setea el shader de objetos coloreados*/
    var rawVertex = getMainRawVertexShader();
    var rawFragment = getMainRawFragmentShader();
    initMainShader(rawVertex, rawFragment);
    /*Se setea el shader de edificios*/
    var rawBuildingVertex = getBuildingRawVertexShader();
    var rawBuildingFragment = getBuildingRawFragmentShader();
    initBuildingShader(rawBuildingVertex, rawBuildingFragment);
    /*Configuracion de eventos de jquery*/
    setButtons();

    gl.clearColor(0.0, 0.60, 0.60, 1.0);
    gl.enable(gl.DEPTH_TEST);
    /*Controlador del canvas lateral*/
    curveController = new CurveController();
    /*Se crea el controlador de camaras*/
    cameraController = new CameraController();
    /*Se crea la camara orbital*/
    var orbit = new OrbitCamera();
    /*Se agrega la camara orbital al controlador de camaras*/
    cameraController.addCamera(orbit);
    cameraController.init();

    globalDrawType = gl.TRIANGLE_STRIP;
    /*Se crea la escena*/
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
  * @param {rawShader} RawShader Contiene el codigo del shader.
*/
function getShader(rawShader){
    var shader;
    shader = gl.createShader(rawShader.getType());

    gl.shaderSource(shader, rawShader.getShaderCode());
    gl.compileShader(shader);

    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)){
        alert(gl.getShaderInfoLog(shader));
        return null;
    }
    return shader;
}
/**Inicializa el mShaderProgram
  * @param {rawVertex} RawVertexShader Objeto que contiene el string del vs-colored
  * @param {rawFragment} RawFragmentShader Objeto que contiene el string del fs-colored
*/
function initMainShader(rawVertex, rawFragment){
    //Se crean los shaders de fragment y vertex
    var fragmentShader = getShader(rawFragment);
    var vertexShader = getShader(rawVertex);
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

/**Inicializa el buildingShader
  * @param {rawVertex} RawVertexShader Contiene el vs-textured
  * @param {rawFragment} RawFragmentShader Contiene el fs-textured
*/
function initBuildingShader(rawVertex, rawFragment){
    var fragmentShader = getShader(rawFragment);
    var vertexShader = getShader(rawVertex);

    buildingShader = gl.createProgram();
    gl.attachShader(buildingShader, vertexShader);
    gl.attachShader(buildingShader, fragmentShader);
    gl.linkProgram(buildingShader);

    if (!gl.getProgramParameter(buildingShader, gl.LINK_STATUS)) {
        alert("Could not initialise shaders");
    }

    buildingShader.vertexPositionAttribute = gl.getAttribLocation(buildingShader, "aVertexPosition");
    gl.enableVertexAttribArray(buildingShader.vertexPositionAttribute);

    buildingShader.textureCoordAttribute = gl.getAttribLocation(buildingShader, "aTextureCoord");
    gl.enableVertexAttribArray(buildingShader.textureCoordAttribute);

    buildingShader.vertexNormalAttribute = gl.getAttribLocation(buildingShader, "aVertexNormal");
    gl.enableVertexAttribArray(buildingShader.vertexNormalAttribute);

    buildingShader.pMatrixUniform = gl.getUniformLocation(buildingShader, "uPMatrix");
    buildingShader.ViewMatrixUniform = gl.getUniformLocation(buildingShader, "uViewMatrix");
    buildingShader.ModelMatrixUniform = gl.getUniformLocation(buildingShader, "uModelMatrix");
    buildingShader.nMatrixUniform = gl.getUniformLocation(buildingShader, "uNMatrix");
    buildingShader.samplerUniform = gl.getUniformLocation(buildingShader, "uSampler");
    buildingShader.useLightingUniform = gl.getUniformLocation(buildingShader, "uUseLighting");
    buildingShader.ambientColorUniform = gl.getUniformLocation(buildingShader, "uAmbientColor");
    buildingShader.lightingDirectionUniform = gl.getUniformLocation(buildingShader, "uLightPosition");
    buildingShader.directionalColorUniform = gl.getUniformLocation(buildingShader, "uDirectionalColor");
}
