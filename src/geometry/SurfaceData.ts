import Vector from './Vector';

class SurfaceData {
  nhit: Vector
  tex: Vector

  constructor(nhit: Vector, tex: Vector) {
    this.nhit = nhit;
    this.tex = tex;
  }
}

export default SurfaceData;
