import Object3D from "./object3D";
import Attribute from './attribute';
import Vector3 from "../math/vector3";


const helpVector = new Vector3();
const helpVector0 = new Vector3();
const range = [-(10e-6), 10e-6];

const Geometry = function(points) {
    Object3D.call(this);

    // 点
    this.vertexes = new Attribute('position');
    // 索引
    this.indexes = null;

    // 法向量
    this.normals = new Attribute('normal');
}

Geometry.prototype = Object.assign({}, Object3D.prototype, {
    constructor: Geometry,
    isGeometry: true,
    /**
     * 从点集合中获取模型顶点数据
     * @param {Array} points 点集合
     */
    fromPoints(points) {
        let point, startIndex, i = 0, length = points.length, vertexes = new Float32Array(length * 3);

        for (; i < length; i++) {
            point = points[i];
            startIndex = i * 3;
            vertexes[startIndex] = point.x;
            vertexes[startIndex + 1] = point.y;
            vertexes[startIndex + 2] = point.z;
        }

        this.vertexes.update(data);
    },
    /**
     * 计算法向量
     */
    computeNormas() {
        let vertexes = this.vertexes.data
        if (vertexes.length) {
            // 
        }
    }
});

export default Geometry;