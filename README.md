Design patterns are reusable solutions to common problems in software design. They provide a template for how to solve a problem in a way that has been proven to work in the past.

## History of design patterns

- Basically, the concept of design patterns was introduced in field of architecture by Christopher Alexander in his book "A Pattern Language" in 1970s.
  - In this book, he discussed how certain patterns can be indentified and applied to solve recurring design problems in architectural design.
- The idea was later adapted to software engineering in 1990s by the "Gang of Four" (GoF) in their book "Design Patterns: Elements of Reusable Object-Oriented Software" published in 1994.
  - The four people were Erich Gamma, Richard Helm, Ralph Johnson, and John Vlissides, they presented 23 design patterns for Object-Oriented programming.
  - The langauge originally used in the book was C++ and Smalltalk, but the patterns can be applied to any object-oriented language.

![](/assets/2025-07-07-08-39-57.png)

## Introduction to UML Diagrams

UML = Unified Modeling Language (a standard language used in software engineering for visualizing the design of a system)

### UML Symbols Quick Reference

![](/assets/2025-07-07-08-50-29.png)

#### Class Diagram

- **Rectangle**: A class or abstract class or an interface
  - Top: Class / Abstract Class / Interface name
  - Middle: Properties / Attributes
  - Bottom: Methods

- **-** : Private
- **#** : Protected
- **+** : Public
- **~** : Package (default)

![](/assets/2025-07-07-09-25-12.png)

#### Relationships

- **Solid line**: Association
- **Arrow (→)**: Directed Association (e.g., one class uses another)

- **Empty triangle arrow (▲)**: Inheritance / Generalization
  `Child ──▷ Parent` / `Class ──▷ Interface`

- **Empty diamond (◇)**: Aggregation (whole–part, can exist independently)
  `Whole ◇── Part`

- **Filled diamond (◆)**: Composition (strong ownership, part can't exist without whole)
  `Whole ◆── Part`

- **Dashed arrow (--->)**: Dependency (e.g., uses temporarily)

#### Other Common Symbols

- **Stick figure**: Actor (in use case diagrams)
- **Oval**: Use case
- **Rounded rectangle**: Activity (in activity diagrams)
- **Circle with arrow**: Start point
- **Bullseye (solid circle in a ring)**: End point
- **Diamond**: Decision node (in activity diagrams)
