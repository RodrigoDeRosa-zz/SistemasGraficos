var gl;
var mShaderProgram;
var mainCanvas = document.getElementById("mainCanvas");
var globalDrawType = null;

var CameraMatrix = mat4.create();
var mvMatrix = mat4.create();
var mvMatrixStack = [];
var pMatrix = mat4.create();

var mouse = {x:0, y:0};
var mouseDown = false;
var lastReceiver = null;

var previousClientX = 0;
var previousClientY = 0;
var lastMouseX = null;
var lastMouseY = null;

var scene;
var cameraController;
var frame = 0.0;
