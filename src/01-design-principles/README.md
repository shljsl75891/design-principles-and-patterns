# SOLID Design Principles

### Single Responsibility Principle

Robert C. Martin

- A class should have only one reason to change.
- Each class should have single responsibility

### Open Closed Principle

Robert C. Martin

- The modules (classes, interfaces, functions) should be open for extension
- The modules must be closed for modification.
- Once the module is reviewed and tested, it should never be changed. The code can be edited but the existing functionality can't be modified. It should only be extended.

### Liskov Substitution Principle

Barbara Liskov

- If S is a subtype of T, the instances of T in a program may be replaced with instances of type S.
- Replacement should be without altering any of the desirable properties of the program.

### Interface Segregation Principle

Robert C. Martin

- No client should be forced to depend on interfaces they don't use
- Any module should not need to implement any functionality in the contract which will never be used
- Think twice before adding functionality to existing interface, instead create a new one if possible.

### Dependency Inversion Principle - Flipping the direction of dependency

Robert C. Martin

- High Level Modules should not depend on Low Level Modules. Both should depend on abstractions.
- Abstractions should not depend on details. Details should depend on abstractions and follow the contract described in abstractions.
- High Level Modules should be decoupled from Low Level Modules using abstractions like interfaces and abstract classes.
