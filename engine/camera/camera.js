import Vector3 from '../math/vector3';
import Matrix4 from '../math/matrix4';
import Class from '../core/class';

const helpVector = new Vector3();
const helpMatrix = new Matrix4();
/**
 * 相机基础类
 */
const Camera = function() {
    Class.call(this);
    this.projectionMatrix = new Matrix4();
}

Camera.prototype = Object.assign({}, Class.prototype, {
    constructor: Camera,
    isCamera: true,
    lookAt(x, y, z) {
        if (x instanceof Vector3) {
            helpVector.copy(x);
        } else {
            helpVector.set(x, y, z);
        }

        helpMatrix.setLookAt(this.position, helpVector, this.up);

        this.rortation.fromRotateMatrix(helpMatrix);
    },
});

export default Camera;