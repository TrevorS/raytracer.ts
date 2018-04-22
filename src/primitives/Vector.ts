class Vector {
  x: number
  y: number
  z: number

  constructor(x: number, y: number, z: number) {
    this.x = x;
    this.y = y;
    this.z = z;
  }

  static zero(): Vector {
    return new Vector(0, 0, 0);
  }

  static at(value: number): Vector {
    return new Vector(value, value, value);
  }

  static sphericalToCartesian(theta: number, phi: number): Vector {
    const x = Math.cos(phi) * Math.sin(theta);
    const y = Math.sin(phi) * Math.sin(theta);
    const z = Math.cos(theta);

    return new Vector(x, y, z);
  }

  length(): number {
    const norm = this.norm();

    return Math.sqrt(norm);
  }

  norm(): number {
    return this.x * this.x + this.y * this.y + this.z * this.z;
  }

  add(vector: Vector): Vector {
    return new Vector(
      this.x + vector.x,
      this.y + vector.y,
      this.z + vector.z,
    );
  }

  subtract(vector: Vector): Vector {
    return new Vector(
      this.x - vector.x,
      this.y - vector.y,
      this.z - vector.z,
    );
  }

  multiply(scalar: number): Vector {
    return new Vector(
      this.x * scalar,
      this.y * scalar,
      this.z * scalar,
    );
  }

  dot(vector: Vector): number {
    return this.x * vector.x + this.y * vector.y + this.z * vector.z;
  }

  cross(vector: Vector): Vector {
    return new Vector(
      this.y * vector.z - this.z * vector.y,
      this.z * vector.x - this.x * vector.z,
      this.x * vector.y - this.y * vector.x,
    );
  }

  normalize(): Vector {
    const lengthSquared = this.dot(this);

    if (lengthSquared > 0) {
      const invertedLength = 1 / Math.sqrt(lengthSquared);

      this.x *= invertedLength;
      this.y *= invertedLength;
      this.z *= invertedLength;
    }

    return this;
  }
}

export default Vector;
