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
    /*Se setea el shader de calles*/
    var rawStreetVertex = getStreetRawVertexShader();
    var rawStreetFragment = getStreetRawFragmentShader();
    initStreetShader(rawStreetVertex, rawStreetFragment);
    /*Configuracion de eventos de jquery*/
    setButtons();
    /*Se crean las texturas*/
    initTextures();

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
/**Inicializa la textura
  * @param {path} string Directorio de la imagen
*/
function initTexture(path){
    var texture = gl.createTexture();
    var image = new Image();

    image.onload = function () {
        gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
        gl.bindTexture(gl.TEXTURE_2D, texture);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.REPEAT);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.REPEAT);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_NEAREST);
        gl.generateMipmap(gl.TEXTURE_2D);
    }
    image.src = path;
    texture.image = image;
    return texture;
}
/*Inicializa todas las texturas utilizadas*/
function initTextures(){

    /*Texturas del shader de deficios*/
    gl.useProgram(buildingShader);
    /*Carga de texturas*/
    var buildingTexture1 = initTexture('maps/ed1_pisos.jpg');
    var buildingTexture2 = initTexture('maps/ed2_pisos.jpg');
    var buildingTexture3 = initTexture('maps/ed11_pisos.jpg');
    /*Obtencion del fd de cada una en el shader*/
    var sTop1Location = gl.getUniformLocation(buildingShader, "sTop1");
    var sTop2Location = gl.getUniformLocation(buildingShader, "sTop2");
    var sTop3Location = gl.getUniformLocation(buildingShader, "sTop3");
    /*Top 1*/
    gl.uniform1i(sTop1Location, 0); //TEXTURE 0
    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, buildingTexture1);
    /*Top 2*/
    gl.uniform1i(sTop2Location, 1); //TEXTURE 1
    gl.activeTexture(gl.TEXTURE1);
    gl.bindTexture(gl.TEXTURE_2D, buildingTexture2);
    /*Top 3*/
    gl.uniform1i(sTop3Location, 2); //TEXTURE 2
    gl.activeTexture(gl.TEXTURE2);
    gl.bindTexture(gl.TEXTURE_2D, buildingTexture3);

    /*Texturas del shader de calle*/
    gl.useProgram(streetShader);
    /*Carga de texturas*/
    var streetTexture = initTexture('maps/tramo-dobleamarilla.jpg');
    var crossroadTexture = initTexture('maps/cruce.jpg');
    var sidewalkTexture = initTexture('maps/sidewalk.jpg');
    /*Obtencion del fd de cada una en el shader*/
    var sStreetLocation = gl.getUniformLocation(streetShader, "streetTex");
    var sCrossLocation = gl.getUniformLocation(streetShader, "crossTex");
    var sSideLocation = gl.getUniformLocation(streetShader, "sidewalkTex");
    /*Calle*/
    gl.uniform1i(sStreetLocation, 3); //TEXTURE 3
    gl.activeTexture(gl.TEXTURE3);
    gl.bindTexture(gl.TEXTURE_2D, streetTexture);
    /*Esquina*/
    gl.uniform1i(sCrossLocation, 4); //TEXTURE 4
    gl.activeTexture(gl.TEXTURE4);
    gl.bindTexture(gl.TEXTURE_2D, crossroadTexture);
    /*Vereda*/
    gl.uniform1i(sSideLocation, 5); //TEXTURE 5
    gl.activeTexture(gl.TEXTURE5);
    gl.bindTexture(gl.TEXTURE_2D, sidewalkTexture);
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
    buildingShader.useLightingUniform = gl.getUniformLocation(buildingShader, "uUseLighting");
    buildingShader.ambientColorUniform = gl.getUniformLocation(buildingShader, "uAmbientColor");
    buildingShader.lightingDirectionUniform = gl.getUniformLocation(buildingShader, "uLightPosition");
    buildingShader.directionalColorUniform = gl.getUniformLocation(buildingShader, "uDirectionalColor");

    idBuilding = gl.getAttribLocation(buildingShader, "aID");
}

/**Inicializa el buildingShader
  * @param {rawVertex} RawVertexShader Contiene el vs-textured
  * @param {rawFragment} RawFragmentShader Contiene el fs-textured
*/
function initStreetShader(rawVertex, rawFragment){
    var fragmentShader = getShader(rawFragment);
    var vertexShader = getShader(rawVertex);

    streetShader = gl.createProgram();
    gl.attachShader(streetShader, vertexShader);
    gl.attachShader(streetShader, fragmentShader);
    gl.linkProgram(streetShader);

    if (!gl.getProgramParameter(streetShader, gl.LINK_STATUS)) {
        alert("Could not initialise shaders");
    }

    streetShader.vertexPositionAttribute = gl.getAttribLocation(streetShader, "aVertexPosition");
    gl.enableVertexAttribArray(streetShader.vertexPositionAttribute);

    streetShader.textureCoordAttribute = gl.getAttribLocation(streetShader, "aTextureCoord");
    gl.enableVertexAttribArray(streetShader.textureCoordAttribute);

    streetShader.vertexNormalAttribute = gl.getAttribLocation(streetShader, "aVertexNormal");
    gl.enableVertexAttribArray(streetShader.vertexNormalAttribute);

    streetShader.pMatrixUniform = gl.getUniformLocation(streetShader, "uPMatrix");
    streetShader.ViewMatrixUniform = gl.getUniformLocation(streetShader, "uViewMatrix");
    streetShader.ModelMatrixUniform = gl.getUniformLocation(streetShader, "uModelMatrix");
    streetShader.nMatrixUniform = gl.getUniformLocation(streetShader, "uNMatrix");
    streetShader.useLightingUniform = gl.getUniformLocation(streetShader, "uUseLighting");
    streetShader.ambientColorUniform = gl.getUniformLocation(streetShader, "uAmbientColor");
    streetShader.lightingDirectionUniform = gl.getUniformLocation(streetShader, "uLightPosition");
    streetShader.directionalColorUniform = gl.getUniformLocation(streetShader, "uDirectionalColor");

    idStreet = gl.getAttribLocation(streetShader, "aID");
}
