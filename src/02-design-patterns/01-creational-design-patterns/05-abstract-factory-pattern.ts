// Product Interfaces
interface IChair {
  sit(): void;
}

interface ISofa {
  relax(): void;
}

interface IStudyTable {
  study(): void;
}

// Concrete Product classes
class VictorianChair implements IChair {
  sit(): void {
    console.log("Sitting on VictorianChair");
  }
}
class ModernChair implements IChair {
  sit(): void {
    console.log("Sitting on ModernChair");
  }
}
class ArtDecoChair implements IChair {
  sit(): void {
    console.log("Sitting on ArtDecoChair");
  }
}

class VictorianSofa implements ISofa {
  relax(): void {
    console.log("Relaxing on VictorianSofa");
  }
}
class ModernSofa implements ISofa {
  relax(): void {
    console.log("Relaxing on ModernSofa");
  }
}
class ArtDecoSofa implements ISofa {
  relax(): void {
    console.log("Relaxing on ArtDecoSofa");
  }
}

class VictorianStudyTable implements IStudyTable {
  study(): void {
    console.log("Studying on VictorianStudyTable");
  }
}
class ModernStudyTable implements IStudyTable {
  study(): void {
    console.log("Studying on ModernStudyTable");
  }
}
class ArtDecoStudyTable implements IStudyTable {
  study(): void {
    console.log("Studying on ArtDecoStudyTable");
  }
}

// Abstract Factory Interface
abstract class FurnitureFactory {
  abstract createChair(): IChair;
  abstract createStudyTable(): IStudyTable;
  abstract createSofa(): ISofa;
}

// Furniture Abstract Factory for creating family of products of each variant
class ArtDecoFurnitureFactory extends FurnitureFactory {
  createChair(): IChair {
    return new ArtDecoChair();
  }
  createStudyTable(): IStudyTable {
    return new ArtDecoStudyTable();
  }
  createSofa(): ISofa {
    return new ArtDecoSofa();
  }
}

class ModernFurnitureFactory extends FurnitureFactory {
  createChair(): IChair {
    return new ModernChair();
  }
  createStudyTable(): IStudyTable {
    return new ModernStudyTable();
  }
  createSofa(): ISofa {
    return new ModernSofa();
  }
}

class VictorianFurnitureFactory extends FurnitureFactory {
  createChair(): IChair {
    return new VictorianChair();
  }
  createStudyTable(): IStudyTable {
    return new VictorianStudyTable();
  }
  createSofa(): ISofa {
    return new VictorianSofa();
  }
}

/* ------------------------------ CLIENT CODE ------------------------------ */
/**
 * This pattern lets us produce families of related objects without specifying their concrete classes.
 *
 * @example
 * - Related Objects = Chair, Sofa and StudyTable
 * - Families = Modern, Victorian and Art Deco
 *
 * @todo
 * - Declare common interfaces for all variant of products
 * - Declare concrete variant product classes implementing all declared interfaces
 * - Declare interface for abstract factory with methods for creation of each product
 * - Declare all concrete variant factory implementing the interface
 */

function createFurniture(factory: FurnitureFactory) {
  factory.createChair().sit();
  factory.createSofa().relax();
  factory.createStudyTable().study();
}

const modernFactory = new ModernFurnitureFactory();
const victorianFactory = new VictorianFurnitureFactory();
const artDecoFactory = new ArtDecoFurnitureFactory();

createFurniture(modernFactory);
createFurniture(victorianFactory);
createFurniture(artDecoFactory);
