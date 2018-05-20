import Vector3 from "../math/vector3";
import Matrix4 from "../math/matrix4";
import Quaternion from "../math/quaternion";
import Euler from "../math/euler";

import {defineReadOnlyProperty} from '../util/index';

let id = 0;
const helpQuaternion = new Quaternion();
const helpVector = new Vector3();
const helpMatrix = new Matrix4();

/**
 * 基础类
 * @property {Vector3} position 物体位置属性，只读
 * @property {Euler} rotation 物体旋转属性，只读
 * @property {Vector3} scale 物体伸缩属性，只读
 */
const Object3D = function() {
    this.id =  'Object' + (++id);
    this.name = '';

    // 物体方向
    this.up = Object3D.defaultUp.clone();

    defineReadOnlyProperty(this, 'position', new Vector3());
    defineReadOnlyProperty(this, 'rotation', new Euler());
    defineReadOnlyProperty(this, scale, new Vector3(1, 1, 1));
    
    this.matrix = new Matrix4();
}

Object3D.prototype = Object.assign({}, Object.prototype, {
    constructor: Object3D,
    isObject3D: true,
    lookAt(x, y, z) {
        if (x instanceof Vector3) {
            helpVector.copy(x);
        } else {
            helpVector.set(x, y, z);
        }

        helpMatrix.setLookAt(helpVector, this.position, this.up);
        
        this.rotation.fromRotateMatrix(helpMatrix);
    },
    updateMatrix() {

    }
});

/**
 * 物体默认方向
 */
Object3D.defaultUp = new Vector3(0, 1, 0);

export default Object3D;