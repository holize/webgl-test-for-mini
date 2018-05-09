export default class Attribute {
    constructor(name, data = new Float32Array(), size = 0, type = Attribute.FLOAT, bufferType = Attribute.STATIC_DRAW, drawType = Attribute.ARRAY_BUFFER) {
        this.name = name;
        this.data = data;
        this.size = size;
        this.type = type;
        this.bufferType = bufferType;
        this.drawType = drawType;

        this.count = Math.ceil(this.data.length / size);

        this.hasBuffer = false;
        this.needUpdate = false;
    }

    updateData(data) {
        this.data = data;
        this.count = Math.ceil(this.data.length / size);
        
        this.needUpdate = true;
    }

    /**
     * 
     * @param {WebGLRenderingContext | WebGL2RenderingContext} gl 
     */
    bindBuffer(gl) {
        let buffer = gl.createBuffer();

        // 绑定缓存区对象
        gl.bindBuffer(this.bufferType, buffer);
        // 写入数据 
        gl.bufferData(this.bufferType, this.data, this.drawType);

        // 取消绑定
        gl.bindBuffer(this.bufferType, null);

        this.buffer = buffer;

        this.hasBuffer = true;
        this.needUpdate = false;
    }

    /**
     * 更新缓存区对象数据
     * @param {WebGLRenderingContext | WebGL2RenderingContext} gl 
     */
    updateBuffer(gl) {
        // 绑定缓存区对象
        gl.bindBuffer(this.bufferType, buffer);
        // 写入数据 
        gl.bufferData(this.bufferType, this.data, this.drawType);

        // 取消绑定
        gl.bindBuffer(this.bufferType, null);

        this.needUpdate = false;
    }

    /**
     * 使用缓存
     * @param {WebGLRenderingContext | WebGL2RenderingContext} gl 
     * @param {WebGLProgram} program 绘制程序
     */
    useBuffer(gl, program) {
        if (!this.hasBuffer) {
            this.bindBuffer(gl);
        }

        if (this.needUpdate) {
            this.updateBuffer(gl);
        }

        gl.bindBuffer(this.bufferType, this.buffer);

        // 获取属性引用
        let attrIndex = gl.getAttribLocation(program, this.name);
        // 设置属性值
        gl.vertexAttribPointer(attrIndex, this.size, this.type, false, 0, 0);
    }

    delBuffer(gl) {
        gl.deleteBuffer(this.buffer);
    }

    destroy() {
        this.buffer = null;
    }
}

/**
 * 数据类型
 */
Attribute.BYTE = 0x140;
Attribute.UNSIGNED_BYTE = 0x1401;
Attribute.SHORT = 0x1402;
Attribute.UNSIGNED_SHORT = 0x1403;
Attribute.INT = 0x1404;
Attribute.UNSIGNED_INT = 0x1405;
Attribute.FLOAT = 0x1406;

/**
 * 缓存区数据绘制类型
 */
Attribute.STATIC_DRAW = 0x88E4;
Attribute.STREAM_DRAW = 0x88E0;
Attribute.DYNAMIC_DRAW = 0x88E8;

/**
 * 缓存区类型
 */
Attribute.ARRAY_BUFFER = 0x8892;
Attribute.ELEMENT_ARRAY_BUFFER = 0x8893;