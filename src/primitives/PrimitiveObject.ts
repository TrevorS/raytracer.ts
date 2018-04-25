import Intersection from '../geometry/Intersection';
import SurfaceData from '../geometry/SurfaceData';

import Vector from '../geometry/Vector';

abstract class PrimitiveObject {
  abstract intersect(orig: Vector, dir: Vector): Intersection
  abstract getSurfaceData(phit: Vector, nhit: Vector): SurfaceData
}

export default PrimitiveObject;
