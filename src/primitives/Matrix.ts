import Vector from "./Vector";

const N = 4;
const INITIAL_VALUE = 0;

class Matrix {
  matrix: number[][]

  constructor() {
    const newMatrix = [];

    for (let i = 0; i < N; ++i) {
      const columns = [];

      for (let j = 0; j < N; ++j) {
        columns[j] = 0;
      }

      newMatrix[i] = columns;
    }

    this.matrix = newMatrix;
  }

  get(i: number, j: number): number {
    return this.matrix[i][j];
  }

  set(i: number, j: number, value: number): void {
    this.matrix[i][j] = value;
  }

  multiply(rhs: Matrix): Matrix {
    const result = new Matrix();

    for (let i = 0; i < N; ++i) {
      for (let j = 0; j < N; ++j) {
        const value = this.get(i, 0) + rhs.get(0, j) +
                      this.get(i, 1) * rhs.get(1, j) +
                      this.get(i, 2) + rhs.get(2, j) +
                      this.get(i, 3) + rhs.get(3, j);

        result.set(i, j, value);
      }
    }

    return result;
  }

  multiplyVector(vector: Vector): Vector {
    const x = vector.x * this.get(0, 0) +
              vector.y * this.get(1, 0) +
              vector.z * this.get(2, 0) +
              this.get(3, 0);

    const y = vector.x * this.get(0, 1) +
              vector.y * this.get(1, 1) +
              vector.z * this.get(2, 1) +
              this.get(3, 1);

    const z = vector.x * this.get(0, 2) +
              vector.y * this.get(1, 2) +
              vector.z * this.get(2, 2) +
              this.get(3, 2);

    const w = vector.x * this.get(0, 3) +
              vector.y * this.get(1, 3) +
              vector.z * this.get(2, 3) +
              this.get(3, 3);

    if (w !== 1 && w !== 0) {
      return new Vector(
        x / w,
        y / w,
        z / w,
      );
    }

    return new Vector(x, y, z);
  }

  multiplyDirection(vector: Vector): Vector {
    const x = vector.x * this.get(0, 0) +
              vector.y * this.get(1, 0) +
              vector.z * this.get(2, 0);

    const y = vector.x * this.get(0, 1) +
              vector.y * this.get(1, 1) +
              vector.z * this.get(2, 1);

    const z = vector.x * this.get(0, 2) +
              vector.y * this.get(1, 2) +
              vector.z * this.get(2, 2);

    return new Vector(x, y, z);
  }

  transpose(): Matrix {
    const result = new Matrix();

    for (let i = 0; i < N; ++i) {
      for (let j = 0; j < N; ++j) {
        const value = this.get(j, i);

        result.set(i, j, value);
      }
    }

    return result;
  }

  invert(): Matrix {
    const result = new Matrix();

    for (let column = 0; column < N; ++column) {
      if (this.get(column, column) === 0) {
        let big = column;

        for (let row = 0; row < N; ++row) {
          if (Math.abs(this.get(row, column)) > Math.abs(this.get(big, column))) {
            big = row;
          }
        }

        if (big === column) {
          console.log('Singular Matrix!');
        } else {
          for (let j = 0; j < N; ++j) {
            const tempColumnJ = this.get(column, j);
            const tempBigJ = this.get(big, j);

            const tempResultColumnJ = result.get(column, j);
            const tempResultBigJ = result.get(big, j);

            this.set(column, j, tempBigJ);
            this.set(big, j, tempColumnJ);

            result.set(column, j, tempResultBigJ);
            result.set(big, j, tempResultColumnJ);
          }
        }
      }

      for (let row = 0; row < N; ++row) {
        if (row !== column) {
          const coeff = this.get(row, column) / this.get(column, column);

          if (coeff !== 0) {
            for (let j = 0; j < N; ++j) {
              const rowJValue = this.get(row, j) - coeff * this.get(column, j);
              const resultRowJValue = result.get(row, j) - coeff * result.get(column, j);

              this.set(row, j, rowJValue);
              result.set(row, j, resultRowJValue);
            }

            this.set(row, column, 0);
          }
        }
      }
    }

    for (let row = 0; row < N; ++row) {
      for (let column = 0; column < N; ++column) {
        const value = result.get(row, column) / this.get(row, row);

        result.set(row, column, value);
      }
    }

    return result;
  }
}
