import PrimitiveObject from "../primitives/PrimitiveObject";

class Intersection {
  distance: number
  primitive: PrimitiveObject | null

  constructor(distance: number, primitive: PrimitiveObject | null) {
    this.distance = distance;
    this.primitive = primitive;
  }

  static miss() {
    return new Intersection(Number.MAX_VALUE, null);
  }

  isHit() {
    return this.primitive !== null;
  }

  isMiss() {
    return this.primitive === null;
  }
}

export default Intersection;
