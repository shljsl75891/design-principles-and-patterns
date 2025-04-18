// --------------------------------------------------NON COMPLIANT CODE----------------------------------------------------------------------------------
type CustomerType = "Regular" | "Premium" | "Gold";

class DiscountStrategy {
  giveDiscount(customerType: CustomerType) {
    if (customerType === "Regular") {
      return 10;
    } else if (customerType === "Premium") {
      return 20;
    } else if (customerType === "Gold") {
      return 30;
    } else {
      return 0;
    }
  }
}

const discount = new DiscountStrategy();

console.log(discount.giveDiscount("Regular"));
console.log(discount.giveDiscount("Premium"));
console.log(discount.giveDiscount("Gold"));

console.log("----------------------------------------------------------");

// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- --------------------------------------------------------------------------------------

/*
 * COMPLIANT CODE - Open / Closed Principle
 *
 * A reviewed and tested code must be never be touched or changed
 * to reduce the risk of bugs
 *
 * They should be open for extension but closed for modification
 *
 * Modification => not stopping us to edit the existing codebase. But,
 * stopping us to modify the existing functionality
 */
interface Customer {
  getDiscount(): number;
  getLoyalityPoints(amountSpent: number): number;
}

class RegularCustomer implements Customer {
  getLoyalityPoints(amountSpent: number): number {
    return amountSpent * 1;
  }
  getDiscount(): number {
    return 10;
  }
}

class PremiumCustomer implements Customer {
  getLoyalityPoints(amountSpent: number): number {
    return amountSpent * 2;
  }
  getDiscount(): number {
    return 20;
  }
}

class GoldCustomer implements Customer {
  getLoyalityPoints(amountSpent: number): number {
    return amountSpent * 3;
  }
  getDiscount(): number {
    return 30;
  }
}

class DiscountManager {
  giveDiscount(customer: Customer) {
    return customer.getDiscount();
  }

  giveLoyalityPoints(customer: Customer, amount: number) {
    return customer.getLoyalityPoints(amount);
  }
}

const regularCustomer = new RegularCustomer();
const premiumCustomer = new PremiumCustomer();
const goldCustomer = new GoldCustomer();

const discountMgr = new DiscountManager();

console.log(discountMgr.giveDiscount(regularCustomer));
console.log(discountMgr.giveDiscount(premiumCustomer));
console.log(discountMgr.giveDiscount(goldCustomer));

console.log(discountMgr.giveLoyalityPoints(regularCustomer, 10));
console.log(discountMgr.giveLoyalityPoints(premiumCustomer, 20));
console.log(discountMgr.giveLoyalityPoints(goldCustomer, 40));
