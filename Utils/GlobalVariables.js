var gl;
var skyShader;
var buildingShader;
var streetShader;
var mainCanvas = document.getElementById("mainCanvas");
var curveCanvas = document.getElementById("curveCanvas");
var globalDrawType = null;

var CameraMatrix = mat4.create();
var mvMatrix = mat4.create();
var mvMatrixStack = [];
var pMatrix = mat4.create();

var mouse = {x:0, y:0};
var mouseDown = false;
var onDrag = false;
var lastReceiver = null;

var previousClientX = 0;
var previousClientY = 0;
var lastMouseX = null;
var lastMouseY = null;

var scene;
var cameraController;
var carControl;
var curveController;
var frame = 0.0;
var stopCars = false;

/*Spots*/
var spotLightPos = [];
var spotLightColor = [0.7, 0.7, 0.7];
/*Directional*/
var diffuseColor = [[0.6, 0.6, 0.4], [0.2, 0.2, 0.4]];
var ambientColor = [[0.8, 0.8, 0.6], [0.3, 0.3, 0.5]];
var sunPos = [[0.0, 200.0, 2000.0], [0.0, 200.0, -2000.0]];
/*Illumination flag*/
var currentTime = 0;
var spotsOn = false;

/*Texture lists*/
var lowerTextures = [];
var upperTextures = [];
var streetTextures = [];
var streetNormalMaps = [];
var upperNormals = [];
var lowerNormals = [];

/*Constants*/
var STREET_RIGHT = 0;
var STREET_LEFT = 1;
var STREET_TOP = 2;
var STREET_BOTTOM = 3;

var CROSS_BOTTOM_LEFT = 0;
var CROSS_TOP_LEFT = 1;
var CROSS_BOTTOM_RIGHT = 2;
var CROSS_TOP_RIGHT = 3;

var BLOCK_BUILDING = 0;
var BLOCK_PARK = 1;
