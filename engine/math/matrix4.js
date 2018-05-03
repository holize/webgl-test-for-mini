import Vector3 from './vector3';
/**
 * 4维矩阵
 * @author holiz
 * 
 */
export default class Matrix4 {
  /**
   * 构造器
   * @param {number} args  可传入16个参数
   */
  constructor(...args) {
    this.elements = new Float32Array([
      1, 0, 0, 0,
      0, 1, 0, 0,
      0, 0, 1, 0,
      0, 0, 0, 1,
    ]);
    if (args.length !== 0) {
      this.set.apply(this, args);
    }
  }
  /**
   * 设置矩阵的各个值
   * @param {number} a 
   * @param {number} b 
   * @param {number} c 
   * @param {number} d 
   * @param {number} e 
   * @param {number} f 
   * @param {number} g 
   * @param {number} h 
   * @param {number} i 
   * @param {number} j 
   * @param {number} k 
   * @param {number} l 
   * @param {number} m 
   * @param {number} n 
   * @param {number} o 
   * @param {number} p 
   */
  set(a, b, c, d,
      e, f, g, h,
      i, j, k, l,
      m, n, o, p
  ) {

    let elements = this.elements;

    elements[0] = a; elements[4] = b; elements[8] = c; elements[12] = d;
    elements[1] = e; elements[5] = f; elements[9] = g; elements[13] = h;
    elements[2] = i; elements[6] = j; elements[10] = k; elements[14] = l;
    elements[3] = m; elements[7] = n; elements[11] = o; elements[15] = p;

    return this;
  }

  /**
   * 设置为单位矩阵
   */
  identity() {
    elements[0] = 1; elements[4] = 0; elements[8] = 0; elements[12] = 0;
    elements[1] = 0; elements[5] = 1; elements[9] = 0; elements[13] = 0;
    elements[2] = 0; elements[6] = 0; elements[10] = 1; elements[14] = 0;
    elements[3] = 0; elements[7] = 0; elements[11] = 0; elements[15] = 1;

    return this;
  }

  /**
   * 矩阵乘法
   * @param {Matrix4} other 
   */
  multiply(other) {
    let i, e, a, b, ai0, ai1, ai2, ai3;

    // 计算 e = a * b
    e = this.elements;
    a = this.elements;
    b = other.elements;
  
    // 是否是矩阵自乘
    if (e === b) {
      b = new Float32Array(16);
      for (i = 0; i < 16; ++i) {
        b[i] = e[i];
      }
    }
  
    for (i = 0; i < 4; i++) {
      ai0 = a[i]; ai1 = a[i + 4]; ai2 = a[i + 8]; ai3 = a[i + 12];
      e[i] = ai0 * b[0] + ai1 * b[1] + ai2 * b[2] + ai3 * b[3];
      e[i + 4] = ai0 * b[4] + ai1 * b[5] + ai2 * b[6] + ai3 * b[7];
      e[i + 8] = ai0 * b[8] + ai1 * b[9] + ai2 * b[10] + ai3 * b[11];
      e[i + 12] = ai0 * b[12] + ai1 * b[13] + ai2 * b[14] + ai3 * b[15];
    }
  
    return this;
  }

  /**
   * 矩阵与3维向量相乘
   * @param {Vector3} vector3 
   */
  multiplyVector3(vector3) {
    let elements = this.elements,
    {x, y, z} = vector3,
    newX, newY, newZ;  
    
    newX = x * elements[0] + y * elements[4] + z * elements[8] + elements[12];
    newY = x * elements[1] + y * elements[5] + z * elements[9] + elements[13];
    newZ = x * elements[2] + y * elements[6] + z * elements[10] + elements[14];

    return new Vector3(newX, newY, newZ);
  }

  /**
   * 矩阵转置
   */
  transpose() {
    let elements, newElements;

    elements = this.elements;

    newElements = elements[1]; elements[1] = elements[4]; elements[4] = newElements;
    newElements = elements[2]; elements[2] = elements[8]; elements[8] = newElements;
    newElements = elements[3]; elements[3] = elements[12]; elements[12] = newElements;
    newElements = elements[6]; elements[6] = elements[9]; elements[9] = newElements;
    newElements = elements[7]; elements[7] = elements[13]; elements[13] = newElements;
    newElements = elements[11]; elements[11] = elements[14]; elements[14] = newElements;
    return this;
  }

  /**
   * 使用一个特殊矩阵求得当前矩阵的逆矩阵
   * @param {Matrix4} other 
   */
  inverseOf(other) {
    let i, src, dist, inv, det;

    src = other.elements;
    dist = this.elements;
    inv = new Float32Array(16);

    inv[0] = src[5] * src[10] * src[15] - src[5] * src[11] * src[14] - src[9] * src[6] * src[15]
      + src[9] * src[7] * src[14] + src[13] * src[6] * src[11] - src[13] * src[7] * src[10];
    inv[4] = - src[4] * src[10] * src[15] + src[4] * src[11] * src[14] + src[8] * src[6] * src[15]
      - src[8] * src[7] * src[14] - src[12] * src[6] * src[11] + src[12] * src[7] * src[10];
    inv[8] = src[4] * src[9] * src[15] - src[4] * src[11] * src[13] - src[8] * src[5] * src[15]
      + src[8] * src[7] * src[13] + src[12] * src[5] * src[11] - src[12] * src[7] * src[9];
    inv[12] = - src[4] * src[9] * src[14] + src[4] * src[10] * src[13] + src[8] * src[5] * src[14]
      - src[8] * src[6] * src[13] - src[12] * src[5] * src[10] + src[12] * src[6] * src[9];

    inv[1] = - src[1] * src[10] * src[15] + src[1] * src[11] * src[14] + src[9] * src[2] * src[15]
      - src[9] * src[3] * src[14] - src[13] * src[2] * src[11] + src[13] * src[3] * src[10];
    inv[5] = src[0] * src[10] * src[15] - src[0] * src[11] * src[14] - src[8] * src[2] * src[15]
      + src[8] * src[3] * src[14] + src[12] * src[2] * src[11] - src[12] * src[3] * src[10];
    inv[9] = - src[0] * src[9] * src[15] + src[0] * src[11] * src[13] + src[8] * src[1] * src[15]
      - src[8] * src[3] * src[13] - src[12] * src[1] * src[11] + src[12] * src[3] * src[9];
    inv[13] = src[0] * src[9] * src[14] - src[0] * src[10] * src[13] - src[8] * src[1] * src[14]
      + src[8] * src[2] * src[13] + src[12] * src[1] * src[10] - src[12] * src[2] * src[9];

    inv[2] = src[1] * src[6] * src[15] - src[1] * src[7] * src[14] - src[5] * src[2] * src[15]
      + src[5] * src[3] * src[14] + src[13] * src[2] * src[7] - src[13] * src[3] * src[6];
    inv[6] = - src[0] * src[6] * src[15] + src[0] * src[7] * src[14] + src[4] * src[2] * src[15]
      - src[4] * src[3] * src[14] - src[12] * src[2] * src[7] + src[12] * src[3] * src[6];
    inv[10] = src[0] * src[5] * src[15] - src[0] * src[7] * src[13] - src[4] * src[1] * src[15]
      + src[4] * src[3] * src[13] + src[12] * src[1] * src[7] - src[12] * src[3] * src[5];
    inv[14] = - src[0] * src[5] * src[14] + src[0] * src[6] * src[13] + src[4] * src[1] * src[14]
      - src[4] * src[2] * src[13] - src[12] * src[1] * src[6] + src[12] * src[2] * src[5];

    inv[3] = - src[1] * src[6] * src[11] + src[1] * src[7] * src[10] + src[5] * src[2] * src[11]
      - src[5] * src[3] * src[10] - src[9] * src[2] * src[7] + src[9] * src[3] * src[6];
    inv[7] = src[0] * src[6] * src[11] - src[0] * src[7] * src[10] - src[4] * src[2] * src[11]
      + src[4] * src[3] * src[10] + src[8] * src[2] * src[7] - src[8] * src[3] * src[6];
    inv[11] = - src[0] * src[5] * src[11] + src[0] * src[7] * src[9] + src[4] * src[1] * src[11]
      - src[4] * src[3] * src[9] - src[8] * src[1] * src[7] + src[8] * src[3] * src[5];
    inv[15] = src[0] * src[5] * src[10] - src[0] * src[6] * src[9] - src[4] * src[1] * src[10]
      + src[4] * src[2] * src[9] + src[8] * src[1] * src[6] - src[8] * src[2] * src[5];

    det = src[0] * inv[0] + src[1] * inv[4] + src[2] * inv[8] + src[3] * inv[12];

    // 没有逆矩阵
    if (det === 0) {
      return this;
    }

    det = 1 / det;
    for (i = 0; i < 16; i++) {
      dist[i] = inv[i] * det;
    }

    return this;
  }

  /**
   * 当前矩阵的逆矩阵
   */
  inverse() {
    return this.inverseOf(this);
  }

  /**
   * 设置为透视矩阵
   * @param {number} fovy 视角
   * @param {number} aspect 透视的方向比例
   * @param {number} near 近景深度
   * @param {number} far  远景深度
   */
  setPerspective(fovy, aspect, near, far) {
    let elements, rd, s, ct;

    fovy = Math.PI * fovy / 180 / 2;
    s = Math.sin(fovy);

    rd = 1 / (far - near);
    ct = Math.cos(fovy) / s;

    elements = this.elements;

    elements[0] = ct / aspect;
    elements[1] = 0;
    elements[2] = 0;
    elements[3] = 0;

    elements[4] = 0;
    elements[5] = ct;
    elements[6] = 0;
    elements[7] = 0;

    elements[8] = 0;
    elements[9] = 0;
    elements[10] = -(far + near) * rd;
    elements[11] = -1;

    elements[12] = 0;
    elements[13] = 0;
    elements[14] = -2 * near * far * rd;
    elements[15] = 0;

    return this;
  }

  /**
   * 设置为正交投影矩阵
   * @param {number} left 视线左距离
   * @param {number} right 视线右距离
   * @param {number} bottom 视线下距离
   * @param {number} top 视线上距离
   * @param {number} near 近景距离
   * @param {number} far 远景距离
   */
  setOrthographic(left, right, bottom, top, near, far) {
    let elements, rw, rh, rd;
  
    rw = 1 / (right - left);
    rh = 1 / (top - bottom);
    rd = 1 / (far - near);
  
    elements = this.elements;
  
    elements[0] = 2 * rw;
    elements[1] = 0;
    elements[2] = 0;
    elements[3] = 0;
  
    elements[4] = 0;
    elements[5] = 2 * rh;
    elements[6] = 0;
    elements[7] = 0;
  
    elements[8] = 0;
    elements[9] = 0;
    elements[10] = -2 * rd;
    elements[11] = 0;
  
    elements[12] = -(right + left) * rw;
    elements[13] = -(top + bottom) * rh;
    elements[14] = -(far + near) * rd;
    elements[15] = 1;
  
    return this;
  }

  /**
   * 设置为缩放矩阵
   * @param {Vector3} vector3 
   */
  setScale({x, y, z}) {
    let elements = this.elements;
    elements[0] = x; elements[4] = 0; elements[8] = 0; elements[12] = 0;
    elements[1] = 0; elements[5] = y; elements[9] = 0; elements[13] = 0;
    elements[2] = 0; elements[6] = 0; elements[10] = z; elements[14] = 0;
    elements[3] = 0; elements[7] = 0; elements[11] = 0; elements[15] = 1;
    return this;
  }

  /**
   * 矩阵的缩放计算
   * @param {Vector3} param0 
   */
  scale({x, y, z}) {
    let elements = this.elements;
    elements[0] *= x; elements[4] *= y; elements[8] *= z;
    elements[1] *= x; elements[5] *= y; elements[9] *= z;
    elements[2] *= x; elements[6] *= y; elements[10] *= z;
    elements[3] *= x; elements[7] *= y; elements[11] *= z;
    return this;
  }

  /**
   * 设置为平移矩阵
   * @param {Vector3} param0 
   */
  setTranslate({x, y, z}) {
    let elements = this.elements;
    elements[0] = 1; elements[4] = 0; elements[8] = 0; elements[12] = x;
    elements[1] = 0; elements[5] = 1; elements[9] = 0; elements[13] = y;
    elements[2] = 0; elements[6] = 0; elements[10] = 1; elements[14] = z;
    elements[3] = 0; elements[7] = 0; elements[11] = 0; elements[15] = 1;
    return this;
  }
  
  /**
   * 矩阵做平移计算
   * @param {Vector3} param0 
   */
  translate({x, y, z}) {
    let elements = this.elements;
    elements[12] += elements[0] * x + elements[4] * y + elements[8] * z;
    elements[13] += elements[1] * x + elements[5] * y + elements[9] * z;
    elements[14] += elements[2] * x + elements[6] * y + elements[10] * z;
    elements[15] += elements[3] * x + elements[7] * y + elements[11] * z;
    return this;
  }

  /**
   * 设置为旋转矩阵
   * @param {number} angle 旋转的角度，单位度
   * @param {Vector3} axis 各轴旋转的分量
   */
  setRotate(angle, {x, y, z}) {
    let elements, s, c, len, rlen, nc, xy, yz, zx, xs, ys, zs;

    angle = Math.PI * angle / 180;
    elements = this.elements;

    s = Math.sin(angle);
    c = Math.cos(angle);

    if (0 !== x && 0 === y && 0 === z) {
      // Rotation around X axis
      if (x < 0) {
        s = -s;
      }
      elements[0] = 1; elements[4] = 0; elements[8] = 0; elements[12] = 0;
      elements[1] = 0; elements[5] = c; elements[9] = -s; elements[13] = 0;
      elements[2] = 0; elements[6] = s; elements[10] = c; elements[14] = 0;
      elements[3] = 0; elements[7] = 0; elements[11] = 0; elements[15] = 1;
    } else if (0 === x && 0 !== y && 0 === z) {
      // Rotation around Y axis
      if (y < 0) {
        s = -s;
      }
      elements[0] = c; elements[4] = 0; elements[8] = s; elements[12] = 0;
      elements[1] = 0; elements[5] = 1; elements[9] = 0; elements[13] = 0;
      elements[2] = -s; elements[6] = 0; elements[10] = c; elements[14] = 0;
      elements[3] = 0; elements[7] = 0; elements[11] = 0; elements[15] = 1;
    } else if (0 === x && 0 === y && 0 !== z) {
      // Rotation around Z axis
      if (z < 0) {
        s = -s;
      }
      elements[0] = c; elements[4] = -s; elements[8] = 0; elements[12] = 0;
      elements[1] = s; elements[5] = c; elements[9] = 0; elements[13] = 0;
      elements[2] = 0; elements[6] = 0; elements[10] = 1; elements[14] = 0;
      elements[3] = 0; elements[7] = 0; elements[11] = 0; elements[15] = 1;
    } else {
      // Rotation around another axis
      len = Math.sqrt(x * x + y * y + z * z);
      if (len !== 1) {
        rlen = 1 / len;
        x *= rlen;
        y *= rlen;
        z *= rlen;
      }
      nc = 1 - c;
      xy = x * y;
      yz = y * z;
      zx = z * x;
      xs = x * s;
      ys = y * s;
      zs = z * s;

      elements[0] = x * x * nc + c;
      elements[1] = xy * nc + zs;
      elements[2] = zx * nc - ys;
      elements[3] = 0;

      elements[4] = xy * nc - zs;
      elements[5] = y * y * nc + c;
      elements[6] = yz * nc + xs;
      elements[7] = 0;

      elements[8] = zx * nc + ys;
      elements[9] = yz * nc - xs;
      elements[10] = z * z * nc + c;
      elements[11] = 0;

      elements[12] = 0;
      elements[13] = 0;
      elements[14] = 0;
      elements[15] = 1;
    }

    return this;
  } 

  /**
   * 旋转操作
   * @param {number} angle
   * @param {Vector3} axis
   */
  rotate = function (angle, axis) {
    return this.multiply(new Matrix4().setRotate(angle, axis));
  }
}