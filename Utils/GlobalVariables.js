var gl;
var mShaderProgram;

var CameraMatrix = mat4.create();
var mvMatrix = mat4.create();
var mvMatrixStack = [];
var pMatrix = mat4.create();

var mouseDown = false;
var previousClientX = 0;
var previousClientY = 0;
var lastMouseX = null;
var lastMouseY = null;

var scene;
var frame = 0.0;
