import Math from './math';
import Euler from "./euler";
import Matrix4 from './matrix4';
import Vector3 from './vector3';

export default class Quaternion {
    constructor(x = 0, y = 0, z = 0, w = 0) {
        this._x = x;
        this._y = y;
        this._z = z;
        this._w = w;

        this._propChange = () => {};
    }

    set x(x) {
        this._x = x;
        this._propChange();
    }
    get x() {
        return this._x;
    }

    set y(y) {
        this._y = y;
        this._propChange();
    }
    get y() {
        return this._y;
    }

    set z(z) {
        this._z = z;
        this._propChange();
    }
    get z() {
        return this._z;
    }

    set w(w) {
        this._w = w;

        this._propChange();
    }
    get w() {
        return this._w;
    }

    set(x, y, z, w) {
        this._x = x;
        this._y = y;
        this._z = z;
        this._w = w;

        this._propChange();
    }

    /**
     * 拷贝当前四元数
     * @param {Quaternion} target 
     */
    clone(target = new Quaternion()) {
        target._x = this._x;
        target._y = this._y;
        target._z = this._z;
        target._w = this._w;
        return target;
    }

    /**
     * 复制目标四元数到当前对象
     * @param {Quaternion} target 
     * @param {boolean} fireUpdate 是否执行监听
     */
    copy(target, fireUpdate) {
        this._x = target._x;
        this._y = target._y;
        this._z = target._z;
        this._w = target._w;

        fireUpdate && this._propChange();

        return this;
    }

    /**
     * 从旋转轴/角转换为四元数
     * @param {number} angle 旋转角度，单位度
     * @param {Vector3} vector3 旋转轴
     * @param {boolean} fireUpdate 是否执行监听
     */
    fromRotate(angle, {x, y, z}, fireUpdate) {
        angle = Math.PI * angle / 360;
        let sin = Math.sin(angle),
            cons = Math.cos(angle);
        this._x = sin * x;
        this._y = sin * y;
        this._z = sin * z;
        this._w = cos;

        fireUpdate && this._propChange();

        return this;
    }

    /**
     * 从欧拉角转化到当前四元数
     * @param {Euler} euler xyz旋转顺序欧拉角
     * @param {boolean} fireUpdate 是否执行监听
     */
    fromEuler(euler, fireUpdate) {

        let {sin, cos} = Math,
            hx = euler._x / 2,
            hy = euler._y / 2,
            hz = euler._z / 2,
            sx = sin(hx),
            sy = sin(hy),
            sz = sin(hz),
            cx = cos(hx),
            cy = cos(hy),
            cz = cos(hz);

        this._x = sy * sz * cx + cy * cz * sy;
        this._y = sy * cz * cx + cy * sz * sx;
        this._z = cy * sz * cx - sy * cz * sx;
        this._w = cy * cz * cx - sy * sz * sx;
    
        fireUpdate && this._propChange();

        return this;
    }

    /**
     * 从旋转矩阵转化为四元数
     * @param {Matrix4} matrix 
     */
    fromRotateMatrix(matrix, fireUpdate) {

        return this;
    }
}