interface IPaymentStrategy {
  pay(amount: number): void;
}

class CreditCardPaymentStrategy implements IPaymentStrategy {
  pay(amount: number): void {
    console.log(`Paying ${amount} using Credit Card`);
  }
}

class PaypalPaymentStrategy implements IPaymentStrategy {
  pay(amount: number): void {
    console.log(`Paying ${amount} using Paypal`);
  }
}

class BitcoinPaymentStrategy implements IPaymentStrategy {
  pay(amount: number): void {
    console.log(`Paying ${amount} using Bitcoin`);
  }
}

class PaymentContext {
  private _paymentStrategy: IPaymentStrategy;

  constructor(paymentStrategy: IPaymentStrategy) {
    this._paymentStrategy = paymentStrategy;
  }

  public set paymentStrategy(paymentStrategy: IPaymentStrategy) {
    this._paymentStrategy = paymentStrategy;
  }

  executePayment(amount: number): void {
    this._paymentStrategy.pay(amount);
  }
}

const creditCardPaymentStrategy = new CreditCardPaymentStrategy();
const paypalPaymentStrategy = new PaypalPaymentStrategy();
const bitcoinPaymentStrategy = new BitcoinPaymentStrategy();

const paymentContext = new PaymentContext(creditCardPaymentStrategy);
paymentContext.executePayment(100);

paymentContext.paymentStrategy = paypalPaymentStrategy;
paymentContext.executePayment(100);

paymentContext.paymentStrategy = bitcoinPaymentStrategy;
paymentContext.executePayment(100);
