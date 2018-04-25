import Vector from './Vector';

function clamp(low: number, high: number, value: number): number {
  return Math.max(low, Math.min(high, value));
}

function degreesToRadians(degrees: number): number {
  return degrees * (Math.PI / 180);
}

function mix(a: Vector, b: Vector, mixValue: number): Vector {
  return a.multiply(1 - mixValue).add(b.multiply(mixValue));
}

export {
  clamp,
  degreesToRadians,
  mix,
};
