import Intersection from '../geometry/Intersection';
import SurfaceData from '../geometry/SurfaceData';

import Vector from '../geometry/Vector';

abstract class PrimitiveObject {
  color: Vector

  constructor(color: Vector) {
    this.color = color;
  }

  abstract intersect(orig: Vector, dir: Vector): Intersection
  abstract getSurfaceData(phit: Vector): SurfaceData
}

export default PrimitiveObject;
