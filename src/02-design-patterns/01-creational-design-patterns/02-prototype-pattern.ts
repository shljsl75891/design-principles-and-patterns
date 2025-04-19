/**
 * PROTOTYPE DESIGN PATTERN
 * - Copying an object “from the outside” isn’t always possible because of some private and protected properties
 * - This allow us to copy existing objects with same properties without depending on their classes directly.
 * - This pattern delegates the cloning process to the actual objects that are being cloned without exposing internal structure
 */
interface Prototype {
  clone(): Prototype;
}

interface ShapeProperties {
  color: string;
  x: number;
  y: number;
}

abstract class Shape implements Prototype {
  public properties: ShapeProperties = { color: "red", x: 10, y: 10 };
  abstract clone(): Shape;
}

// Any class that supports cloning is called `PROTOTYPE`.
class Rectangle extends Shape {
  constructor(
    private length: number,
    private breadth: number,
  ) {
    super();
  }
  clone(): Rectangle {
    const clone = new Rectangle(this.length, this.breadth);
    clone.properties = { ...this.properties };
    return clone;
  }
}

class Circle extends Shape {
  constructor(private radius: number) {
    super();
  }

  clone(): Circle {
    const clone = new Circle(this.radius);
    clone.properties = { ...this.properties };
    return clone;
  }
}

const redRectangle = new Rectangle(20, 30);
const purpleCircle = new Circle(15);

const blueRectangle = redRectangle.clone();
blueRectangle.properties.color = "blue";

const yellowCircle = purpleCircle.clone();
yellowCircle.properties.color = "yellow";

console.log("Red Rectange: ", redRectangle);
console.log("Blue Rectange: ", blueRectangle);
console.log("Purple Circle: ", purpleCircle);
console.log("Yellow Circle: ", yellowCircle);
