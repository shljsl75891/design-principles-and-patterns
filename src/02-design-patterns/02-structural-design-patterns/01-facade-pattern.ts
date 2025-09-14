class Grinder {
  public grindBeans(): void {
    console.log("Grinding coffee beans...");
  }
}

class Boiler {
  public boilWater(): void {
    console.log("Boiling water...");
  }
}
class Brewer {
  public brewCoffee(): void {
    console.log("Brewing coffee...");
  }
}

/**
 * This pattern provides a simplified interface to a complex subsystem.
 * It involves creating a single wrapper class that provides simple methods
 * required by the client and delegates calls to methods of existing system classes.
 */
class CoffeeMakerFacade {
  constructor(
    private grinder: Grinder,
    private boiler: Boiler,
    private brewer: Brewer,
  ) {}

  public makeCoffee(): void {
    this.grinder.grindBeans();
    this.boiler.boilWater();
    this.brewer.brewCoffee();
    console.log("Coffee is ready!");
  }
}

/* ----------------------------- Client Code ----------------------------- */
const grinder = new Grinder();
const boiler = new Boiler();
const brewer = new Brewer();

const coffeeMaker = new CoffeeMakerFacade(grinder, boiler, brewer);
coffeeMaker.makeCoffee();
