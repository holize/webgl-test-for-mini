 // a cube
  //    v6----- v5
  //   /|      /|
  //  v1------v0|
  //  | |     | |
  //  | |v7---|-|v4
  //  |/      |/
  //  v2------v3
export default class Cube {
  constructor(gl) {
    this.vertices = new Float32Array([
      1.0, 1.0, 1.0,   // v0
      -1.0, 1.0, 1.0,  // v1
      -1.0, -1.0, 1.0,  // v2
      1.0, -1.0, 1.0,   // v3

      1.0, 1.0, 1.0,   // v0
      1.0, -1.0, 1.0,   // v3
      1.0, -1.0, -1.0,  // v4
      1.0, 1.0, -1.0,   // v5

      1.0, 1.0, 1.0,  // v0
      -1.0, 1.0, 1.0,  // v1
      -1.0, 1.0, -1.0,  // v6
      1.0, 1.0, -1.0,   // v5

      -1.0, -1.0, -1.0, // v7
      -1.0, -1.0, 1.0,  // v2
      1.0, -1.0, 1.0,   // v3
      1.0, -1.0, -1.0,  // v4

      -1.0, -1.0, -1.0, // v7 
      1.0, -1.0, -1.0,  // v4
      1.0, 1.0, -1.0,   // v5
      -1.0, 1.0, -1.0,  // v6

      -1.0, -1.0, -1.0, // v7
      -1.0, 1.0, -1.0,  // v6
      -1.0, 1.0, 1.0,  // v1
      -1.0, -1.0, 1.0,  // v2
    ]);

    this.colors = new Float32Array([
      0.3, 0.3, 0.1,
      0.3, 0.3, 0.1,
      0.3, 0.1, 0.1,
      0.3, 0.1, 0.1,

      0.5, 0.3, 0.5,
      0.5, 0.3, 0.5,
      0.5, 0.3, 0.5,
      0.5, 0.3, 0.5,

      0.6, 0.2, 0.1,
      0.6, 0.2, 0.1,
      0.6, 0.2, 0.1,
      0.6, 0.2, 0.1,

      0.6, 0.6, 0.1,
      0.6, 0.6, 0.1,
      0.6, 0.6, 0.1,
      0.6, 0.6, 0.1,

      0.1, 0.1, 0.9,
      0.1, 0.6, 0.9,
      0.1, 0.6, 0.9,
      0.1, 0.1, 0.9,

      0.5, 0.5, 0.5,
      0.5, 0.5, 0.5,
      0.5, 0.3, 0.5,
      0.5, 0.3, 0.5,
    ]);

    this.indices = new Uint8Array([
      0, 1, 2, 0, 2, 3,
      4, 5, 6, 4, 6, 7,
      8, 9, 10, 8, 10, 11,
      12, 13, 14, 12, 14, 15,
      16, 17, 18, 16, 18, 19,
      20, 21, 22, 20, 22, 23,
    ]);


    this.vertexBuffer = this.initArrayBuffer(gl, this.vertices, 3, gl.FLOAT);
    this.colorBuffer = this.initArrayBuffer(gl, this.colors, 3, gl.FLOAT);
    this.indiceBuffer = this.initIndiceBuffer(gl, this.indices, this.indices.length, gl.UNSIGNED_BYTE);
    this.unBindBuffer(gl);
  }

  unBindBuffer(gl) {
    gl.bindBuffer(gl.ARRAY_BUFFER, null);
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);
  }

  useArrayBuffer(gl, program, buffer, attribute) {
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    // 获取属性引用
    let a_attribute = gl.getAttribLocation(program, attribute);
    // 设置属性
    gl.vertexAttribPointer(a_attribute, buffer.num, buffer.type, false, 0, 0);
    gl.enableVertexAttribArray(a_attribute);
  }

  draw(gl, program) {
    this.useArrayBuffer(gl, program, this.vertexBuffer, 'position');
    this.useArrayBuffer(gl, program, this.colorBuffer, 'color');

    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.indiceBuffer);

    gl.drawElements(gl.TRIANGLES, this.indiceBuffer.num, this.indiceBuffer.type, 0);
  }

  initArrayBuffer(gl, data, num, type) {
    let buffer = gl.createBuffer();

    // 将数据写入缓存对象
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, data, gl.STATIC_DRAW);

    buffer.num = num;
    buffer.type = type;

    return buffer;
  }

  initIndiceBuffer(gl, data, num, type) {
    let buffer = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, data, gl.STATIC_DRAW);

    buffer.num = num;
    buffer.type = type;

    return buffer;
  }
}