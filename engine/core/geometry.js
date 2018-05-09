import Class from "./class";
import Attribute from './attribute';

const Geometry = function(points) {
    Class.call(this);

    // 点
    this.vertexes = new Attribute('position');
    // 索引
    this.indexes = null;

    this.normals = new Attribute('normal');
}

Geometry.prototype = Object.assign({}, Class.prototype, {
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