/**
 * The Factory design pattern help us to create family of similar
 * related objects (many classes implementing same super abstract class / interface)
 * without specifying their concrete classes.
 */
abstract class Car {
  constructor(
    public model: string,
    public year: number,
  ) {}
  abstract displayInfo(): void;
}

enum CarType {
  Renault = "Renault",
  Suzuki = "Suzuki",
  Tata = "Tata",
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
class CarFactory {
  private static _instance: CarFactory;
  private constructor() {}

  static get instance(): CarFactory {
    if (!this._instance) {
      console.log("Instantiating car factory");
      this._instance = new CarFactory();
    }
    return this._instance;
  }

  createCar(type: CarType, model: string, year: number): Car {
    switch (type) {
      case CarType.Tata:
        return new TataCar(model, year);
      case CarType.Suzuki:
        return new SuzukiCar(model, year);
      case CarType.Renault:
        return new RenaultCar(model, year);
      default:
        throw new Error("Invalid type of car");
    }
  }
}

/* --------------------------- Client Code ------------------------- */
const carFactory = CarFactory.instance;
carFactory.createCar(CarType.Renault, "Kwid", 2017).displayInfo();
carFactory.createCar(CarType.Suzuki, "Alto", 2017).displayInfo();
carFactory.createCar(CarType.Renault, "Duster", 2019).displayInfo();
carFactory.createCar(CarType.Tata, "Bolero", 2013).displayInfo();
