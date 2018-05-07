import Vector3 from '../math/vector3';
import Matrix4 from '../math/matrix4';
import Object3D from '../core/object';
/**
 * 相机基础类
 */
export default class Camera extends Object3D {
    constructor() {
        // 相机位置
        this.position = new Vector3();
        // 方向
        this.up = new Vector3(0, 1, 0);
        // 旋转角度
        this.rotation = new Vector3();

        this.projectionMatrix = new Matrix4();
    }

    isCamera = true;

    updateMatrix() {
        let pos = this.position.clone();
        pos.sub(this.target);
        // Normalize f.
        rlf = 1 / Math.sqrt(fx * fx + fy * fy + fz * fz);
        fx *= rlf;
        fy *= rlf;
        fz *= rlf;

        // Calculate cross product of f and up.
        sx = fy * upZ - fz * upY;
        sy = fz * upX - fx * upZ;
        sz = fx * upY - fy * upX;

        // Normalize s.
        rls = 1 / Math.sqrt(sx * sx + sy * sy + sz * sz);
        sx *= rls;
        sy *= rls;
        sz *= rls;

        // Calculate cross product of s and f.
        ux = sy * fz - sz * fy;
        uy = sz * fx - sx * fz;
        uz = sx * fy - sy * fx;
    }
}