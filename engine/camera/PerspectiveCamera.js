import Camera from "./camera";

export default class PerspectiveCamera extends Camera {
    constructor(fovy, aspect, near, far) {
        super();
        
        this.projectionMatrix.setPerspective(fovy, aspect, near, far);
    }
}