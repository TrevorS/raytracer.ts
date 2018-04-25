import PrimitiveObject from './PrimitiveObject';

import Intersection from '../geometry/Intersection';
import SurfaceData from '../geometry/SurfaceData';
import Vector from '../geometry/Vector';

class Sphere extends PrimitiveObject {
  center: Vector;
  radius: number;

  constructor(center: Vector, radius: number) {
    super();

    this.center = center;
    this.radius = radius;
  }

  intersect(orig: Vector, dir: Vector): Intersection {
    let t0: number;
    let t1: number;

    const L = this.center.subtract(orig);
    const tca = L.dot(dir);

    if (tca < 0) {
      return Intersection.miss();
    }

    const L2 = L.dot(L);
    const radius2 = this.radius * this.radius;

    const d2 = L2 - tca * tca;

    if (d2 > radius2) {
      return Intersection.miss();
    }

    const thc = Math.sqrt(radius2 - d2);

    t0 = tca - thc;
    t1 = tca + thc;

    if (t0 > t1) {
      const t1Temp = t1;

      t1 = t0;

      t0 = t1Temp;
    }

    if (t0 < 0) {
      t0 = t1;

      if (t0 < 0) {
        return Intersection.miss();
      }
    }

    return new Intersection(t0, this);
  }

  getSurfaceData(phit: Vector): SurfaceData {
    const nhit = phit.subtract(this.center);
    nhit.normalize();

    const tex = Vector.zero();
    tex.x = (1 + Math.atan2(nhit.z, nhit.x) / Math.PI) * 0.5;
    tex.y = Math.acos(nhit.y) / Math.PI;

    return new SurfaceData(nhit, tex);
  }
}

export default Sphere;
