/*Inicia el glProgram y los shaders*/
function webGLStart(){
    var mainCanvas = document.getElementById("mainCanvas");
    initGL(mainCanvas);
    /*Se setea el shader del cielo*/
    var rawSkyVertex = getSkyRawVertexShader();
    var rawSkyFragment = getSkyRawFragmentShader();
    initSkyShader(rawSkyVertex, rawSkyFragment);
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
    var floorCamera = new FreeCamera();
    var highwayCamera = new FreeCamera();
    highwayCamera.setHeight(20.05);
    /*Se agrega la camara orbital al controlador de camaras*/
    cameraController.addCamera(orbit);
    cameraController.addCamera(floorCamera);
    cameraController.addCamera(highwayCamera);
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
    /*Texturas del shader de edificios*/
    /*Partes de arriba*/
    var mainPath = 'Utils/Images/tops/';
    /*Carga de texturas*/
    for (var i = 1; i <= 20; i++){
        initTexture(mainPath + 'ed' + i + '_pisos.jpg', upperTextures);
    }
    initTexture(mainPath + 'roof.jpg', upperTextures);

    /*Normales de edificios*/
    mainPath = 'Utils/Images/topNormals/';
    /*Carga de texturas*/
    for (var i = 1; i <= 20; i++){
        initTexture(mainPath + 'ed' + i + '_pisos_n.jpg', upperNormals);
    }
    initTexture(mainPath + 'roof_n.jpg', upperNormals);

    /*Partes de abajo*/
    mainPath = 'Utils/Images/lows/';
    /*Carga de texturas*/
    for (var i = 1; i <= 20; i++){
        initTexture(mainPath + 'ed' + i + '_pb.jpg', lowerTextures);
    }

    /*Normales de locales*/
    mainPath = 'Utils/Images/lowNormals/';
    /*Carga de texturas*/
    for (var i = 1; i <= 20; i++){
        initTexture(mainPath + 'ed' + i + '_pb_n.jpg', lowerNormals);
    }

    /*Texturas del shader de calle*/
    mainPath = 'Utils/Images/street/';
    var paths = ['asphalt.jpg', 'concrete.jpg', 'grass.jpg', 'cruce.jpg',
        'light.jpg', 'tramo-dobleamarilla.jpg', 'vereda.jpg', 'auto.jpg'];
    /*Carga de texturas*/
    for (var i = 0; i <= paths.length; i++){
        initTexture(mainPath + paths[i], streetTextures);
    }
    initTexture(mainPath + 'refmap.jpg', streetTextures);

    /*Texturas de normales*/
    mainPath = 'Utils/Images/streetNormals/';
    paths = ['asphalt_n.jpg', 'concrete_n.jpg', 'grass_n.jpg', 'cruce_n.jpg',
        'light_n.jpg', 'tramo-dobleamarilla_n.jpg', 'vereda_n.jpg', 'auto_n.jpg'];
    /*Carga de texturas*/
    for (var i = 0; i <= paths.length; i++){
        initTexture(mainPath + paths[i], streetNormalMaps);
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
function initSkyShader(rawVertex, rawFragment){
    //Se crean los shaders de fragment y vertex
    var fragmentShader = getShader(rawFragment);
    var vertexShader = getShader(rawVertex);
    //Se crea el mShaderProgram linkeandole los fragment y vertex shaders
    skyShader = gl.createProgram();
    gl.attachShader(skyShader, vertexShader);
    gl.attachShader(skyShader, fragmentShader);
    gl.linkProgram(skyShader);
    if(!gl.getProgramParameter(skyShader, gl.LINK_STATUS)) alert("Could not initialise shaders");
    //Se linkean los atributos de los vertices
    //Posicion
    skyShader.vertexPositionAttribute = gl.getAttribLocation(skyShader, "aVertexPosition");
    gl.enableVertexAttribArray(skyShader.vertexPositionAttribute);
    //Color
    skyShader.textureCoordAttribute = gl.getAttribLocation(skyShader, "aTextureCoord");
    gl.enableVertexAttribArray(skyShader.textureCoordAttribute);
    //Se linkea el resto de las variables
    skyShader.pMatrixUniform = gl.getUniformLocation(skyShader, "uPMatrix");
    skyShader.ViewMatrixUniform = gl.getUniformLocation(skyShader, "uViewMatrix");
    skyShader.ModelMatrixUniform = gl.getUniformLocation(skyShader, "uModelMatrix");
    skyShader.texSampler = gl.getUniformLocation(skyShader, "uSampler");
    skyShader.spotsOn = gl.getUniformLocation(skyShader, "uSpotsOn");
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

    buildingShader.vertexTangentAttribute = gl.getAttribLocation(buildingShader, "aVertexTangent");
    gl.enableVertexAttribArray(buildingShader.vertexTangentAttribute);

    buildingShader.pMatrixUniform = gl.getUniformLocation(buildingShader, "uPMatrix");
    buildingShader.ViewMatrixUniform = gl.getUniformLocation(buildingShader, "uViewMatrix");
    buildingShader.ModelMatrixUniform = gl.getUniformLocation(buildingShader, "uModelMatrix");
    buildingShader.nMatrixUniform = gl.getUniformLocation(buildingShader, "uNMatrix");
    buildingShader.useLightingUniform = gl.getUniformLocation(buildingShader, "uUseLighting");
    buildingShader.ambientColorUniform = gl.getUniformLocation(buildingShader, "uAmbientColor");
    buildingShader.lightingDirectionUniform = gl.getUniformLocation(buildingShader, "uLightPosition");
    buildingShader.directionalColorUniform = gl.getUniformLocation(buildingShader, "uDirectionalColor");

    buildingShader.topSampler = gl.getUniformLocation(buildingShader, "uTopSampler");
    buildingShader.lowSampler = gl.getUniformLocation(buildingShader, "uLowSampler");
    buildingShader.roofSampler = gl.getUniformLocation(buildingShader, "uRoofSampler");
    buildingShader.topNormalSampler = gl.getUniformLocation(buildingShader, "uTopNormalSampler");
    buildingShader.lowNormalSampler = gl.getUniformLocation(buildingShader, "uLowNormalSampler");

    buildingShader.topX = gl.getUniformLocation(buildingShader, "scaleXTop");
    buildingShader.topY = gl.getUniformLocation(buildingShader, "scaleYTop");
    buildingShader.lowX = gl.getUniformLocation(buildingShader, "scaleXLow");
    buildingShader.lowY = gl.getUniformLocation(buildingShader, "scaleYLow");

    buildingShader.x = gl.getUniformLocation(buildingShader, "x");
    buildingShader.y = gl.getUniformLocation(buildingShader, "y");
    buildingShader.lim = gl.getUniformLocation(buildingShader, "lim");
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

    streetShader.vertexTangentAttribute = gl.getAttribLocation(streetShader, "aVertexTangent");
    gl.enableVertexAttribArray(streetShader.vertexTangentAttribute);

    streetShader.pMatrixUniform = gl.getUniformLocation(streetShader, "uPMatrix");
    streetShader.ViewMatrixUniform = gl.getUniformLocation(streetShader, "uViewMatrix");
    streetShader.ModelMatrixUniform = gl.getUniformLocation(streetShader, "uModelMatrix");
    streetShader.nMatrixUniform = gl.getUniformLocation(streetShader, "uNMatrix");
    streetShader.useLightingUniform = gl.getUniformLocation(streetShader, "uUseLighting");
    streetShader.ambientColorUniform = gl.getUniformLocation(streetShader, "uAmbientColor");
    streetShader.lightingDirectionUniform = gl.getUniformLocation(streetShader, "uLightPosition");
    streetShader.directionalColorUniform = gl.getUniformLocation(streetShader, "uDirectionalColor");
    streetShader.specularColorUniform = gl.getUniformLocation(streetShader, "uSpecularColor");

    streetShader.spotlightsPosArray = gl.getUniformLocation(streetShader, "uSpotLightPos");
    streetShader.spotlightsColor = gl.getUniformLocation(streetShader, "uSpotLightColor");

    streetShader.shininess = gl.getUniformLocation(streetShader, "uShininess");
    streetShader.useSpot = gl.getUniformLocation(streetShader, "uUseSpot");
    streetShader.spotsOn = gl.getUniformLocation(streetShader, "uSpotsOn");

    streetShader.x = gl.getUniformLocation(streetShader, "scaleX");
    streetShader.y = gl.getUniformLocation(streetShader, "scaleY");
    streetShader.uSampler = gl.getUniformLocation(streetShader, "uSampler");
    streetShader.normalSampler = gl.getUniformLocation(streetShader, "uNormalSampler");
}
