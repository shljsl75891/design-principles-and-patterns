class Customer {
  constructor(
    // @ts-expect-error - ununsed property
    private firstName: string = "",
    // @ts-expect-error - ununsed property
    private lastName: string = "",
    // @ts-expect-error - ununsed property
    private email: string = "",
    // @ts-expect-error - ununsed property
    private phoneNumber: string = "",
  ) {}
}

/**
 * This pattern is used to create complex objects
 * with many number of possible configurations
 */
interface ICustomerBuilder {
  withFirstName(value: string): ICustomerBuilder;
  withLastName(value: string): ICustomerBuilder;
  withEmail(value: string): ICustomerBuilder;
  withPhoneNumber(value: string): ICustomerBuilder;
  build(): Customer;
}

/**
 * @class CustomerBuilder
 * Responsible for creating customer step by step
 */
class CustomerBuilder implements ICustomerBuilder {
  private firstName: string = "";
  private lastName: string = "";
  private email: string = "";
  private phoneNumber: string = "";

  constructor() {
    this.reset();
  }

  withFirstName(value: string): ICustomerBuilder {
    this.firstName = value;
    return this;
  }

  withLastName(value: string): ICustomerBuilder {
    this.lastName = value;
    return this;
  }

  withEmail(value: string): ICustomerBuilder {
    this.email = value;
    return this;
  }

  withPhoneNumber(value: string): ICustomerBuilder {
    this.phoneNumber = value;
    return this;
  }

  private reset(): void {
    this.firstName = "";
    this.lastName = "";
    this.email = "";
    this.phoneNumber = "";
  }

  build(): Customer {
    const customer = new Customer(
      this.firstName,
      this.lastName,
      this.email,
      this.phoneNumber,
    );
    this.reset();
    return customer;
  }
}

/**
 * @class CustomerDirector
 * Reponsible for creating different kind of customers
 */
class CustomerDirector {
  constructor(private builder: ICustomerBuilder) {}

  buildMinimalCustomer(firstName: string, lastName: string) {
    return this.builder.withFirstName(firstName).withLastName(lastName).build();
  }

  buildFullCustomer(
    firstName: string,
    lastName: string,
    email: string,
    phoneNumber: string,
  ) {
    return this.builder
      .withFirstName(firstName)
      .withLastName(lastName)
      .withEmail(email)
      .withPhoneNumber(phoneNumber)
      .build();
  }
}

/*---------------------- Client Code --------------------------*/

const customerBuilder = new CustomerBuilder();
const customerDirector = new CustomerDirector(customerBuilder);

console.log(customerDirector.buildMinimalCustomer("XYZ", "Kumar"));
console.log(
  customerDirector.buildFullCustomer(
    "ABC",
    "Sandhu",
    "abc.sandhu@org.com",
    "+911234567890",
  ),
);
