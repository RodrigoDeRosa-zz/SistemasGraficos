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
function initTexture(path, textures){
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
    /*Agrega la textura a la lista*/
    textures.push(texture);
}
/*Inicializa todas las texturas utilizadas*/
function initTextures(){
    var textures = [];
    var glTextures = [gl.TEXTURE0, gl.TEXTURE1, gl.TEXTURE2, gl.TEXTURE3, gl.TEXTURE4, gl.TEXTURE5,
        gl.TEXTURE6, gl.TEXTURE7, gl.TEXTURE8, gl.TEXTURE9, gl.TEXTURE10, gl.TEXTURE11, gl.TEXTURE12, gl.TEXTURE13, gl.TEXTURE14,
        gl.TEXTURE15];
    var shaderName = ["sTop1", "sTop2", "sTop3", "sTop4", "sTop5", "sTop6", "sTop7", "sTop8",
        "sLow1", "sLow2", "sLow3", "sLow4", "sLow5", "sLow6", "sLow7", "sRoof"];

    /*Texturas del shader de deficios*/
    gl.useProgram(buildingShader);
    /*Carga de texturas*/
    initTexture('maps/ed1_pisos.jpg', textures);
    initTexture('maps/ed2_pisos.jpg', textures);
    initTexture('maps/ed3_pisos.jpg', textures);
    initTexture('maps/ed4_pisos.jpg', textures);
    initTexture('maps/ed5_pisos.jpg', textures);
    initTexture('maps/ed19_pisos.jpg', textures);
    initTexture('maps/ed7_pisos.jpg', textures);
    initTexture('maps/ed8_pisos.jpg', textures);
    initTexture('maps/ed1_pb.jpg', textures);
    initTexture('maps/ed2_pb.jpg', textures);
    initTexture('maps/ed3_pb.jpg', textures);
    initTexture('maps/ed4_pb.jpg', textures);
    initTexture('maps/ed5_pb.jpg', textures);
    initTexture('maps/ed19_pb.jpg', textures);
    initTexture('maps/ed7_pb.jpg', textures);
    initTexture('maps/roof.jpg', textures);
    /*Obtencion del fd de cada una en el shader*/
    for (var i = 0; i < 16; i++){
        var location = gl.getUniformLocation(buildingShader, shaderName[i]);
        gl.uniform1i(location, i);
        gl.activeTexture(glTextures[i]);
        gl.bindTexture(gl.TEXTURE_2D, textures[i]);
    }

    /*Texturas del shader de calle*/
    gl.useProgram(streetShader);
    var textures2 = [];
    var glTextures2 = [gl.TEXTURE16, gl.TEXTURE17, gl.TEXTURE18, gl.TEXTURE19,
        gl.TEXTURE20, gl.TEXTURE21, gl.TEXTURE22, gl.TEXTURE23, gl.TEXTURE24, gl.TEXTURE25,
        gl.TEXTURE26, gl.TEXTURE27, gl.TEXTURE28, gl.TEXTURE29];
    var shaderName2 = ["lightTex", "lightNormal", "streetTex", "streetNormal", "crossTex", "crossNormal",
        "sidewalkTex", "sidewalkNorm", "concreteTex", "concreteNorm", "asphaltTex", "asphaltNormal",
        "grassTex", "grassNormal"];
    /*Carga de texturas*/
    initTexture('maps/light.jpg', textures2); //6
    initTexture('maps/light_n.png', textures2); //6
    initTexture('maps/tramo-dobleamarilla.jpg', textures2); //0
    initTexture('maps/tramo-dobleamarilla_n.png', textures2); //0
    initTexture('maps/cruce.jpg', textures2); //1
    initTexture('maps/cruce_n.png', textures2); //1
    initTexture('maps/vereda.jpg', textures2); //2
    initTexture('maps/vereda_normal.jpg', textures2); //2
    initTexture('maps/concrete.jpg', textures2); //3
    initTexture('maps/concrete_n.png', textures2); //3
    initTexture('maps/asphalt.jpg', textures2); //5
    initTexture('maps/asphalt_n.png', textures2); //5
    initTexture('maps/grass.jpg', textures2); //4
    initTexture('maps/grass_n.png', textures2); //4
    /*Obtencion del fd de cada una en el shader*/
    for (var i = 0; i < 14; i++){
        var location = gl.getUniformLocation(streetShader, shaderName2[i]);
        gl.uniform1i(location, i+16); //agarra las texturas desde la 16
        gl.activeTexture(glTextures2[i]);
        gl.bindTexture(gl.TEXTURE_2D, textures2[i]);
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
    buildX = gl.getUniformLocation(buildingShader, "x");
    buildY = gl.getUniformLocation(buildingShader, "y");
    buildLim = gl.getUniformLocation(buildingShader, "lim");
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
