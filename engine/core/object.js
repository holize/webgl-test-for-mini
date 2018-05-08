import Vector3 from "../math/vector3";
import Matrix4 from "../math/matrix4";
import Quaternion from "../math/quaternion";
import Euler from "../math/euler";

const helpQuaternion = new Quaternion();
const helpVector = new Vector3();
const helpMatrix = new Matrix4();

/**
 * 基础类
 * @property {Vector3} position 物体位置属性，只读
 * @property {Euler} rotation 物体旋转属性，只读
 * @property {Vector3} scale 物体伸缩属性，只读
 */
export default class Object3D {
    constructor() {
        this._position = new Vector3();
        this._rotation = new Euler();
        this._scale = new Vector3();

        this._matrix = new Matrix4();

        this.up = Object3D.defaultUp.clone();
    }

    static defaultUp = new Vector3(0, 1, 0);

    /**
     * 物体位置属性
     * 只读属性
     */
    get position() {
        return this._position;
    }

    /**
     * 物体旋转属性
     * 只读属性
     */
    get rotation() {
        return this._rotation;
    }

    /**
     * 物体伸缩属性
     * 只读
     */
    get scale() {
        return this._scale;
    }

    lookAt(x, y, z) {
        if (x instanceof Vector3) {
            helpVector.copy(x);
        } else {
            helpVector.set(x, y, z);
        }

        if (this.isCamera) {
            helpMatrix.lookAt(this.position, helpVector, this.up);
        } else {
            helpMatrix.lookAt(helpVector, this.position, this.up);
        }
    }

    updateMatrix() {}
}