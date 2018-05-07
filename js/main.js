import Cube from '../js/base/cube.js';
import Program from '../js/base/program.js';
import Matrix4 from '../engine/math/matrix4.js';
import Vector3 from '../engine/math/vector3.js';
import Object3D from '../engine/core/object.js';

const screenWidth = window.innerWidth
const screenHeight = window.innerHeight

let gl = canvas.getContext('webgl', {
  antialias: true,
  preserveDrawingBuffer: true
});

let program = new Program(gl, [
  'attribute vec3 position;',
  'attribute vec3 color;',
  'uniform mat4 u_MvpMatrix;',
  'varying vec4 vColor;',
  'void main() {',
  '  vColor = vec4(color, 1.0);',
  '  gl_Position = u_MvpMatrix * vec4(position, 1.0);',
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

  var mvpMatrix = new Matrix4();
  mvpMatrix.setPerspective(30, screenWidth / screenHeight, 1, 100);
  mvpMatrix.lookAt(new Vector3(13, 13, 17), new Vector3(0, 0, 0), new Vector3(0, 1, 0));
  var s;
  console.log(s = new Object3D());
  var u_MvpMatrix = gl.getUniformLocation(program.getProgram(), 'u_MvpMatrix');
  gl.uniformMatrix4fv(u_MvpMatrix, false, mvpMatrix.elements);

  gl.clearColor(0.0, 0.0, 0.0, 1.0);
  gl.enable(gl.DEPTH_TEST);
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
  cube.draw(gl, program.getProgram());
}
