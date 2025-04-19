class Singleton {
  private static _instance: Singleton;

  // This class now can't be instantiated using `new` keyword
  private constructor() {
    console.log("Singleton class instantiated");
  }

  public static get instance(): Singleton {
    return (Singleton._instance = Singleton._instance ?? new Singleton());
  }
}

// const singletonInstance = new SingletonClass(); --> Throws error now

const instance1 = Singleton.instance;
const instance2 = Singleton.instance;
const instance3 = Singleton.instance;

console.log(instance1 === instance2 && instance2 === instance3);
