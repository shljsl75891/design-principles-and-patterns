/**
 * Flyweight Pattern
 *
 * Reduces memory usage when a large number of similar objects are created by
 * sharing common (intrinsic) state across instances instead of duplicating it.
 * It splits object data into intrinsic state (immutable, shared via a cached
 * flyweight) and extrinsic state (unique per instance, passed in at runtime).
 * A factory ensures only one flyweight exists per unique intrinsic combination.
 *
 * Use when: you create thousands or millions of similar objects and most of
 * their state is identical across instances, causing memory pressure.
 */

/**
 * --------- NON COMPLIANT CODE ---------
 * Every Particle owns all its state — both the unique per-instance data
 * (coords, vector, speed) AND the heavy shared data (color, sprite).
 * With 1,000,000 bullets on screen, the sprite alone (~20KB) is duplicated
 * 1,000,000 times, consuming ~21GB of RAM and crashing low-end machines.
 */
class HeavyParticle {
  constructor(
    public coords: [number, number],
    public vector: [number, number],
    public speed: number,
    public color: string,
    public sprite: string, // ~20KB image data per particle
  ) {}

  draw(canvas: string): void {
    console.log(
      `[Non-Compliant] Drawing ${this.color} ${this.sprite} at (${this.coords}) on ${canvas}`,
    );
  }
}

class HeavyGame {
  private particles: HeavyParticle[] = [];

  addParticle(
    coords: [number, number],
    vector: [number, number],
    speed: number,
    color: string,
    sprite: string,
  ): void {
    this.particles.push(
      new HeavyParticle(coords, vector, speed, color, sprite),
    );
  }

  draw(canvas: string): void {
    this.particles.forEach((p) => p.draw(canvas));
  }
}

/**
 * --------- COMPLIANT CODE ------------
 * ParticleType (flyweight) holds only intrinsic state — color and sprite —
 * which is identical for all bullets of the same type. ParticleTypeFactory
 * caches these flyweights so only one exists per type. Particle (context)
 * stores only the lightweight extrinsic state (coords, vector, speed) plus a
 * reference to the shared flyweight. At render time, extrinsic state is passed
 * into the flyweight's draw method — no duplication, ~21GB → ~a few MB.
 */
class ParticleFlyweight {
  constructor(
    public readonly color: string,
    public readonly sprite: string, // heavy shared data, stored once
  ) {}

  draw(
    canvas: string,
    coords: [number, number],
    vector: [number, number],
    speed: number,
  ): void {
    console.log(
      `[Compliant] Drawing ${this.color} ${this.sprite} at (${coords}) speed=${speed} vec=(${vector}) on ${canvas}`,
    );
  }
}

class ParticleFlyweightFactory {
  private cache = new Map<string, ParticleFlyweight>();

  getType(color: string, sprite: string): ParticleFlyweight {
    const key = `${color}:${sprite}`;
    if (!this.cache.has(key)) {
      this.cache.set(key, new ParticleFlyweight(color, sprite));
    }
    return this.cache.get(key)!;
  }

  getCacheSize(): number {
    return this.cache.size;
  }
}

class Particle {
  constructor(
    private coords: [number, number],
    private vector: [number, number],
    private speed: number,
    private flyWeight: ParticleFlyweight, // shared flyweight reference
  ) {}

  draw(canvas: string): void {
    this.flyWeight.draw(canvas, this.coords, this.vector, this.speed);
  }
}

class Game {
  private particles: Particle[] = [];
  private factory = new ParticleFlyweightFactory();

  addParticle(
    coords: [number, number],
    vector: [number, number],
    speed: number,
    color: string,
    sprite: string,
  ): void {
    const type = this.factory.getType(color, sprite);
    this.particles.push(new Particle(coords, vector, speed, type));
  }

  draw(canvas: string): void {
    this.particles.forEach((p) => p.draw(canvas));
  }

  get uniqueParticleTypes(): number {
    return this.factory.getCacheSize();
  }
}

/* --------- Client Code --------- */
// Non-compliant — each particle stores its own copy of heavy sprite data
const heavyGame = new HeavyGame();
heavyGame.addParticle([10, 20], [1, 0], 5, "red", "bullet.jpeg");
heavyGame.addParticle([30, 40], [0, 1], 5, "red", "bullet.jpeg"); // sprite duplicated
heavyGame.addParticle([50, 60], [-1, 1], 3, "gray", "missile.jpeg");
heavyGame.draw("canvas");

console.log("---");

// Compliant — bullet.jpeg and missile.jpeg are each stored once regardless of count
const game = new Game();
game.addParticle([10, 20], [1, 0], 5, "red", "bullet.jpeg");
game.addParticle([30, 40], [0, 1], 5, "red", "bullet.jpeg"); // reuses cached flyweight
game.addParticle([50, 60], [-1, 1], 3, "gray", "missile.jpeg");
game.addParticle([70, 80], [1, -1], 8, "red", "bullet.jpeg"); // reuses again
game.draw("canvas");

console.log(`Unique particle types cached: ${game.uniqueParticleTypes}`); // 2, not 4
