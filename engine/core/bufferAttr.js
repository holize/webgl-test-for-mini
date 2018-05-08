export default class BufferAttr {
    constructor(name = '', data = new Float32Array(), size = 0, type = BufferAttr.FLOAT, bufferType = BufferAttr.ARRAY_BUFFER) {
        this._name = name;
        this._data = data;
        this._size = size;
        this._type = type;
        this._bufferType = bufferType;

        this._totalCount = this._data.length; // 总的数据个数
        this._count = size > 0 ? this._totalCount / size : 0; // 数据组组数
    }

    get count() {
        return this._count;
    }

    get data() {
        return this._data;
    }

    set(data, size, type = BufferAttr.FLOAT) {
        this._data = data;
        this._size = size;
        this._type = type;

        this._totalCount = this._data.length; // 总的数据个数
        this._count = size > 0 ? this._totalCount / size : 0; // 数据组组数
    }

    bindBuffer(gl) {
        let buffer = gl.createBuffer();

        // 将数据写入缓存对象
        gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
        gl.bufferData(gl.ARRAY_BUFFER, data, gl.STATIC_DRAW);

        this._buffer = buffer;
    }

    static BYTE = 0;
    static SHORT = 1;
    static UNSIGNED_BYTE = 3;
    static UNSIGNED_SHORT = 4;
    static FLOAT = 5;
    static HALF_FLOAT = 6;

    static ELEMENT_ARRAY_BUFFER = 10;
    static ARRAY_BUFFER = 11;

}