import Matrix4 from "./matrix4";

const helpMatrix = new Matrix4();

/**
 * 欧拉角类
 * 此类为旋转顺序为XYZ的欧拉角
 */
export default class Euler {
    constructor(x = 0, y = 0, z = 0) {
        this._x = x;
        this._y = y;
        this._z = z;

        this._propChange = () => {

        };
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

    /**
     * 设置欧拉角各分量
     * @param {number} x 
     * @param {number} y 
     * @param {number} z 
     */
    set(x, y, z) {
        this._x = x;
        this._y = y;
        this._z = z;

        this._propChange();

        return this;
    }

    /**
     * 欧拉角分量变化时的监听器
     * @param {Function} cb 
     */
    onChange(cb) {
        this._propChange = cb;
        return this;
    }

    /**
     * 拷贝当前欧拉角
     * @param {Euler} target 
     */
    clone(target = new Euler()) {
        target._x = this._x;
        target._y = this._y;
        target._z = this._z;
        return target;
    }

    /**
     * 复制目标欧拉角到当前对象
     * @param {Euler} target 
     */
    copy(target) {
        this._x = target.x;
        this._y = target._y;
        this._z = target._z;

        this._propChange();

        return this;
    }

    /**
     * 从四元数中获取欧拉角数据
     * @param {Quaternion} quaternion 
     * @param {boolean} fireUpdate 是否执行监听
     */
    fromQuaternion(quaternion, fireUpdate) {
        return this.fromRotateMatrix(helpMatrix.fromQuaternion(quaternion), fireUpdate);
    }

    /**
     * 从旋转矩阵中获取欧拉角数据
     * @param {Matrix4} matrix4 
     * @param {boolean} fireUpdate 是否执行监听
     */
    fromRotateMatrix(matrix4, fireUpdate) {
        let elements = this.elements,
            m11 = elements[0],
            m12 = elements[4],
            m13 = elements[8],
            m22 = elements[5],
            m23 = elements[9],
            m32 = elements[6],
            m33 = elements[10];

        this._y = Math.asin(Math.max(-1, Math.min(1, m13)));

        if (Math.abs(m13) < 0.99999) {
            this._x = Math.atan2(-m23, m33);
            this._z = Math.atan2(-m12, m11);

        } else {
            this._x = Math.atan2(m32, m22);
            this._z = 0;

        }

        fireUpdate && this._propChange();

        return this;
    }
}