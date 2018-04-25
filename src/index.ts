import PrimitiveObject from './primitives/PrimitiveObject';

import Matrix from './geometry/Matrix';
import Sphere from './primitives/Sphere';
import Vector from './geometry/Vector';
import Options from './engine/Options';

import { degreesToRadians, mix } from './geometry/Utilities';
import Intersection from './geometry/Intersection';
import SurfaceData from './geometry/SurfaceData';

const WIDTH = 640;
const HEIGHT = 480;
const FOV = 51.52;

const CAMERA_TO_WORLD = Matrix.as([
  0.945519, 0, -0.325569, 0,
  -0.179534, 0.834209, -0.521403, 0,
  0.271593, 0.551447, 0.78876, 0,
  4.208271, 8.374532, 17.932925, 1
]);

function main() {
  const objects = Array<PrimitiveObject>();

  const numberOfSpheres = 32;

  for (let i = 0; i < numberOfSpheres; ++i) {
    const randomPosition = new Vector(
      (0.5 - Math.random() * 10),
      (0.5 - Math.random() * 10),
      (0.5 + Math.random() * 10),
    );

    const randomRadius = (0.5 + Math.random() * 0.5);

    const randomColor = new Vector(
      Math.random(),
      Math.random(),
      Math.random(),
    );

    objects.push(new Sphere(randomPosition, randomRadius, randomColor));
  }

  const options = new Options(WIDTH, HEIGHT, FOV, CAMERA_TO_WORLD);

  render(options, objects);
}

function render(options: Options, objects: Array<PrimitiveObject>): Array<Vector> {
  const framebuffer = new Array<Vector>();

  const scale = Math.tan(degreesToRadians(options.fov * 0.5));
  const imageAspectRatio = options.width / options.height;

  const orig = options.cameraToWorld.multiplyVector(Vector.zero());

  for (let j = 0; j < options.height; ++j) {
    for (let i = 0; i < options.width; ++i) {

      let x = (2 * (i + 0.5) / options.width - 1) * imageAspectRatio * scale;
      let y = (1 - 2 * (j + 0.5) / options.height) * scale;

      const dir = options.cameraToWorld.multiplyDirection(new Vector(x, y, -1));

      dir.normalize();

      const result = castRay(orig, dir, objects);

      framebuffer.push(result);
    }
  }

  return framebuffer;
}

function trace(orig: Vector, dir: Vector, objects: Array<PrimitiveObject>): Intersection {
  let nearest = Intersection.miss();

  objects.forEach((object) => {
    const intersection = object.intersect(orig, dir);

    if (intersection.isHit() && intersection.distance < nearest.distance) {
      nearest = intersection;
    }
  });

  return nearest;
}

function castRay(orig: Vector, dir: Vector, objects: Array<PrimitiveObject>): Vector {
  let hitColor = Vector.zero();

  objects.forEach((object) => {
    const intersection = trace(orig, dir, objects);

    // TODO: Fix this, isHit should take care of not needed null check.
    if (intersection.isHit() && intersection.primitive !== null) {
      const phit = orig.add(dir.multiply(intersection.distance));
      const surfaceData = intersection.primitive.getSurfaceData(phit);

      const scale = 4;

      let pattern = getPattern(surfaceData, scale);

      hitColor = mix(intersection.primitive.color, intersection.primitive.color.multiply(0.8), pattern).multiply(
          Math.max(0, surfaceData.nhit.dot(dir.multiply(-1))));
    }
  });

  return hitColor;
}

function getPattern(surfaceData: SurfaceData, scale:number): number {
  const p1 = (surfaceData.tex.x * scale) % 1 > 0.5 ? 1 : 0;
  const p2 = (surfaceData.tex.y * scale) % 1 > 0.5 ? 1 : 0;

  return p1 ^ p2;
}
