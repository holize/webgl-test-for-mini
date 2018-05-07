import Math from './math';
/**
 * 3维向量类
 * @author holiz
 * @time 2018-5-3 18:35
 */
export default class Vector3 {
  /**
   * 构造方法
   * @param x 向量x轴的值，默认为0
   * @param y 向量y轴的值，默认为0
   * @param z 向量z轴的值，默认为0
   */
  constructor(x = 0, y = 0, z = 0) {
    this.x = x;
    this.y = y;
    this.z = z;
  }  

  /**
   * 重置向量
   * @param x 向量x轴的值，默认为0
   * @param y 向量y轴的值，默认为0
   * @param z 向量z轴的值，默认为0
   */
  set(x = 0, y = 0, z = 0) {
    this.x = x;
    this.y = y;
    this.z = z;

    return this;
  }

  /**
   * 复制一个向量的值到当前向量
   * @param target 待被复制的向量
   */
  copy(target) {
    let {x, y, z} = target;
    this.x = x;
    this.y = y;
    this.z = z;

    return this;
  }

  /**
   * 克隆当前向量
   * @param target {Vector3} 目标向量
   * @return {Vector3} 返回目标向量
   */
  clone(target = new Vector3()) {
    let { x, y, z } = this;

    target.x = x;
    target.y = y;
    target.z = z;

    return target;
  }

  /**
   * 向量的长度
   */
  length() {
    let {x, y, z} = this;
    return Math.sqrt(x ** 2, y ** 2, z ** 2);
  }
  /**
   * 归一化处理
   */
  normalize() {
    this.divided(this.length());
    return this;
  }

  /**
   * 向量除以数量
   * @param num {number}
   */
  divided(num) {
    this.x /= num;
    this.y /= num;
    this.z /= num;

    return this;
  }  

  /**
   * 向量乘以数量
   * @param num {number}
   */
  mutiply(num) {
    this.x *= num;
    this.y *= num;
    this.z *= num;

    return this;
  }

  /**
   * 向量的叉乘
   */
  product(vector3) {
    let { x, y, z } = this;
    let { x1, y1, z1 } = vector3;

    this.x = y * z1 - y1 * z;
    this.y = x1 * z - x * z1;
    this.z = x * y1 - x1 * y;

    return this;
  }

  /**
   * 向量的点乘
   */
  dot(vector3) {
    let { x, y, z } = this;
    let { x1, y1, z1 } = vector3;

    return x * x1 + y * y1 + z * z1;
  }

  /**
   * 向量加法
   */
  add(vector3) {    
    let { x, y, z } = vector3;

    this.x += x;
    this.y +=y;
    this.z += z;

    return this;
  }
  /**
   * 向量减法
   * @param {Vector3} other
   */
  sub(other) {
    let { x, y, z } = other;

    this.x -= x;
    this.y -= y;
    this.z -= z;

    return this;
  }

  /**
   * 转化为数据形式
   */
  toArray() {
    let { x, y, z } = this;
    return [x, y, z];
  }

  /**
   * 从数组转化为向量
   * @param array
   */
  fromArray(array) {
    let [x, y, z] = array;

    this.x = x;
    this.y = y;
    this.z = z;

    return this;
  }
}