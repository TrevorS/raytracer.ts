import Matrix from "../geometry/Matrix";

class Options {
  width: number
  height: number
  fov: number
  cameraToWorld: Matrix

  constructor(width: number, height: number, fov: number, cameraToWorld: Matrix) {
    this.width = width;
    this.height = height;
    this.fov = fov;
    this.cameraToWorld = cameraToWorld;
  }
}

export default Options;
