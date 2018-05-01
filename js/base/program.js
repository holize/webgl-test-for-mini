export default class Program {
  /**
   * @param gl webgl上下文context
   * @param vertexShader {String} 顶点着色器字符串
   * @param fragmentShader {String} 片元着色器字符串
   */
  constructor(gl, vertexShader, fragmentShader) {

    // 创建着色器    
    this.vertexShader = this.createShader(gl, gl.VERTEX_SHADER, vertexShader);    
    this.fragmentShader = this.createShader(gl, gl.FRAGMENT_SHADER, fragmentShader);

    // 生成gl程序
    this.program = gl.createProgram();

    // 注册着色器
    gl.attachShader(this.program, this.vertexShader);
    gl.attachShader(this.program, this.fragmentShader);

    // 连接gl程序
    gl.linkProgram(this.program);

    // 是否连接成功
    let isLinked = gl.getProgramParameter(this.program, gl.LINK_STATUS);
    if (!isLinked) {
      throw new Error('Fail to link program:' + gl.getProgramInfoLog(this.program));
    }
  }

  createShader(gl, type, source) {
    let shader = gl.createShader(type);

    // 设置着色器代码
    gl.shaderSource(shader, source);

    // 编译着色器代码 
    gl.compileShader(shader);

    let isCompiled = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
    if (!isCompiled) {
      let error = gl.getShaderInfoLog(shader);
      gl.deleteShader(shader);

      throw new Error('Fail to compile Shader:' + error);
    }

    return shader;
  }  

  use(gl) {
    gl.useProgram(this.program);
  }

  getProgram()　{
    return this.program;
  }
}