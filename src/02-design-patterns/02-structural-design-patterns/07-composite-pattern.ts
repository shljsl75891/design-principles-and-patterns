/**
 * Composite Pattern
 *
 * Composes objects into tree structures to represent part-whole hierarchies,
 * where individual objects (leaves) and compositions of objects (composites)
 * share the same interface. Clients treat single items and nested containers
 * uniformly, so recursive operations like price calculation work without
 * knowing whether they're dealing with a leaf or a subtree.
 *
 * Use when: you have tree-structured data where leaves and composites must be
 * treated uniformly, or when client code should not branch on container vs. item.
 */

/**
 * --------- NON COMPLIANT CODE ---------
 * Without a shared interface, client code must instanceof-check to distinguish
 * plain products from boxes. Adding new container types forces changes to every
 * place that calculates totals, violating OCP and making the price logic brittle.
 */
class RawProduct {
  constructor(private price: number) {}
  getPrice(): number {
    return this.price;
  }
}

class RawBox {
  private items: (RawProduct | RawBox)[] = [];
  constructor(private packagingCost: number) {}

  addItem(item: RawProduct | RawBox): void {
    this.items.push(item);
  }

  getPrice(): number {
    let total = this.packagingCost;
    for (const item of this.items) {
      if (item instanceof RawProduct) {
        total += item.getPrice();
      } else if (item instanceof RawBox) {
        total += item.getPrice(); // forced instanceof branching
      }
    }
    return total;
  }
}

/**
 * --------- COMPLIANT CODE ------------
 * IItem is the component interface shared by leaves and composites. Product is
 * the leaf; Box is the composite that holds any IItem (including other Boxes).
 * getPrice() recurses through the tree uniformly — no instanceof checks needed,
 * and new node types only require implementing IItem.
 */
interface IItem {
  getPrice(): number;
}

class Product implements IItem {
  private price: number;

  constructor(price: number) {
    this.price = price;
  }

  getPrice(): number {
    return this.price;
  }
}

interface IBox extends IItem {
  addItem(item: IItem): void;
  getProducts(): IItem[];
}

class Box implements IBox {
  private items: IItem[] = [];
  private packagingCost: number;

  constructor(packagingCost: number) {
    this.packagingCost = packagingCost;
  }

  addItem(item: IItem): void {
    this.items.push(item);
  }

  getProducts(): IItem[] {
    return this.items;
  }

  getPrice(): number {
    return (
      this.items.reduce((total, item) => total + item.getPrice(), 0) +
      this.packagingCost
    );
  }
}

/* --------- Client Code --------- */
const product1 = new Product(10);
const product2 = new Product(20);
const product3 = new Product(15);

const box = new Box(5);
const smallBox = new Box(2);
box.addItem(product1);
box.addItem(product2);
smallBox.addItem(product3);
box.addItem(smallBox);

console.log("Total Price of Box:", box.getPrice()); // 10 + 20 + (15 + 2) + 5 = 52
