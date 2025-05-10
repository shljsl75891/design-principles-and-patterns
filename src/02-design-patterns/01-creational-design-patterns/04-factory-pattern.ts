/**
 * The Factory design pattern help us to create family of similar
 * related objects (many classes implementing same super abstract class / interface)
 * without specifying their concrete classes.
 */
abstract class Car {
  constructor(
    protected readonly model: string,
    protected readonly year: number,
  ) {}
  abstract displayInfo(): void;
}

class RenaultCar extends Car {
  displayInfo(): void {
    console.log(
      `This is a Renault car with model: ${this.model} of year: ${this.year}`,
    );
  }
}

class SuzukiCar extends Car {
  displayInfo(): void {
    console.log(
      `This is a Suzuki car with model: ${this.model} of year: ${this.year}`,
    );
  }
}

class TataCar extends Car {
  displayInfo(): void {
    console.log(
      `This is a Tata car with model: ${this.model} of year: ${this.year}`,
    );
  }
}

/** Creates family of instances of subclasses extending same super class - `Car` */
abstract class CarFactory {
  /**
   * The factory method helps to decouple the instantiation logic from the concrete product classes
   * It doesn’t have to create new instances all the time. It can also return existing objects
   * from a cache, an object pool, or another source.
   */
  abstract createCar(model: string, year: number): Car;
}

class RenaultCarFactory extends CarFactory {
  createCar(model: string, year: number): Car {
    return new RenaultCar(model, year);
  }
}

class SuzukiCarFactory extends CarFactory {
  createCar(model: string, year: number): Car {
    return new SuzukiCar(model, year);
  }
}
class TataCarFactory extends CarFactory {
  createCar(model: string, year: number): Car {
    return new TataCar(model, year);
  }
}

/* --------------------------- Client Code ------------------------- */
const renaultCarFactory = new RenaultCarFactory();
const suzukiCarFactory = new SuzukiCarFactory();
const tataCarFactory = new TataCarFactory();

renaultCarFactory.createCar("Kwid", 2017).displayInfo();
renaultCarFactory.createCar("Duster", 2015).displayInfo();

suzukiCarFactory.createCar("Fronx", 2024).displayInfo();

tataCarFactory.createCar("Bolero", 2014).displayInfo();

/**
 * ✅ When to Use the Control Parameter (Switch is OK) V1:
 * - You’re not planning to extend product types often.
 * - You have a small or fixed number of product types.
 * - You want to avoid class explosion.
 *
 * ❌ When Not Ideal V2:
 * - Product creation logic varies significantly across types.
 * - You want to support open/closed adherence (add without modify).
 * - You're building a library/framework with extensibility in mind.
 */
