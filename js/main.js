import Cube from '../js/base/cube.js';
import Program from '../js/base/program.js';
import Matrix4 from '../engine/math/matrix4.js';
import Vector3 from '../engine/math/vector3.js';
import Quaternion from '../engine/math/quaternion.js';
import Euler from '../engine/math/euler.js';
import Object3D from '../engine/core/object.js';

const screenWidth = window.innerWidth
const screenHeight = window.innerHeight
const requestAnimationFrame = window.requestAnimationFrame;

let gl = canvas.getContext('webgl', {
  antialias: true,
  preserveDrawingBuffer: true
});

let program = new Program(gl, [
  'attribute vec3 position;',
  'attribute vec3 color;',
  'uniform mat4 projectionMatrix;',
  'uniform mat4 modelMatrix;',
  'varying vec4 vColor;',
  'void main() {',
  '  vColor = vec4(color, 1.0);',
  '  gl_Position = projectionMatrix * modelMatrix * vec4(position, 1.0);',
  // '  gl_Position = vec4(position, 1.0);',
  '}',
].join('\n'), [
  '#ifdef GL_ES',
  '  precision mediump float;',
  '#endif',
  'varying vec4 vColor;',
  'void main() {',
  '  gl_FragColor = vColor;',  
  '}',
].join('\n'));

let cube = new Cube(gl);


export default () =>{

  program.use(gl);

  var modelPosition = new Vector3(0,0,0);
  var modelRotation = new Euler(0,0,0);
  var modelScale = new Vector3(1,1,1);


  var projectionMatrix = new Matrix4();
  projectionMatrix.setPerspective(30, screenWidth / screenHeight, 1, 100);
  projectionMatrix.lookAt(new Vector3(13, 13, 17), modelPosition, new Vector3(0, 1, 0));
  
  var modelMatrix = new Matrix4();

  // modelMatrix.transform(modelPosition, modelRotation, modelScale);

  var u_projectionMatrix = gl.getUniformLocation(program.getProgram(), 'projectionMatrix');
  var u_modelMatrix = gl.getUniformLocation(program.getProgram(), 'modelMatrix');

  var modelQuaternion = new Quaternion();

  function render() {
    requestAnimationFrame(render);

    var time = Date.now() * 0.005;
    modelRotation.x = time * 0.5;
    modelRotation.y = time * 0.5;
    // modelRotation.z = time * 0.5;

    modelScale.x = Math.sqrt(Math.sin(time * 0.5));
    modelScale.y = Math.sqrt(Math.sin(time * 0.5));
    modelScale.z = Math.sqrt(Math.sin(time * 0.5));

    // console.log(modelQuaternion.fromEuler(modelRotation))

    modelMatrix.transform(modelPosition, modelQuaternion.fromEuler(modelRotation), modelScale);

    // console.log(modelMatrix);

    gl.uniformMatrix4fv(u_projectionMatrix, false, projectionMatrix.elements);
    gl.uniformMatrix4fv(u_modelMatrix, false, modelMatrix.elements);

    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.enable(gl.DEPTH_TEST);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    cube.draw(gl, program.getProgram());
  }   

  render();
}
