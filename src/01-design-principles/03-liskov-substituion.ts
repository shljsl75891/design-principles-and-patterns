// Payment Processor - UPI, Credit Card, Debit Card

abstract class PaymentProcessor {
  abstract processPayment(amount: number): void;
}

class UPICardPaymentProcessor extends PaymentProcessor {
  processPayment(amount: number): void {
    console.log(`Processing payment of ${amount} through UPI....`);
  }
}
class CreditCardPaymentProcessor extends PaymentProcessor {
  processPayment(amount: number): void {
    console.log(`Processing payment of ${amount} through Credit Card....`);
  }
}
class DebitCardPaymentProcessor extends PaymentProcessor {
  processPayment(amount: number): void {
    console.log(`Processing payment of ${amount} through Debit Card....`);
  }
}

const upiPaymentProcessor = new UPICardPaymentProcessor();
const creditCardPaymentProcessor = new CreditCardPaymentProcessor();
const debitCardPaymentProcessor = new DebitCardPaymentProcessor();

function executePayment(paymentProcessor: PaymentProcessor, amount: number) {
  paymentProcessor.processPayment(amount);
}

// child class instances could be easily replaced with parent class instances
executePayment(upiPaymentProcessor, 1000);
executePayment(debitCardPaymentProcessor, 2435);
executePayment(creditCardPaymentProcessor, 69000);
