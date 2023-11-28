interface ICurrency {
  name: string;
  code: string;
  exchangeRate: number;
}

interface ICurrencyConverter {
  amountOne: number;
  exchangeRateOne: number;
  exchangeRateTwo: number;
  code: string;
  convert(): string;
}

class USDCurrency implements ICurrency {
  name: string;
  code: string;
  exchangeRate: number;

  constructor() {
    this.name = "US Dollar";
    this.code = "USD";
    this.exchangeRate = 1;
  }
  getCurrencyName(): string {
    return this.name;
  }

  getCurrencyCode(): string {
    return this.code;
  }

  getCurrencyExchangeRate(): number {
    return this.exchangeRate;
  }
}

class EuroCurrency implements ICurrency {
  name: string;
  code: string;
  exchangeRate: number;
  constructor() {
    this.name = "Euro";
    this.code = "EUR";
    this.exchangeRate = 0.85;
  }
  getCurrencyName(): string {
    return this.name;
  }

  getCurrencyCode(): string {
    return this.code;
  }

  getCurrencyExchangeRate(): number {
    return this.exchangeRate;
  }
}

class CurrencyConverter implements ICurrencyConverter {
  constructor(
    public amountOne: number,
    public exchangeRateOne: number,
    public exchangeRateTwo: number,
    public code: string
  ) {}
  convert() {
    const convertedAmount =
      this.amountOne * this.exchangeRateOne * this.exchangeRateTwo;
    return `${convertedAmount} ${this.code}`;
  }
}

class CurrencyAdapter implements ICurrency {
  private currencyConverter: CurrencyConverter;

  constructor(private currency: ICurrency, private getCurrency: ICurrency) {
    this.currencyConverter = new CurrencyConverter(
      1,
      currency.exchangeRate,
      getCurrency.exchangeRate,
      getCurrency.code
    );
  }

  get name(): string {
    return this.currency.name;
  }

  get code(): string {
    return this.currency.code;
  }

  get exchangeRate(): number {
    return this.currency.exchangeRate;
  }

  convert(amount: number): string {
    this.currencyConverter.amountOne = amount;
    return this.currencyConverter.convert();
  }
}

const usd = new USDCurrency();
const euro = new EuroCurrency();

const toEoro = new CurrencyConverter(
  100,
  usd.exchangeRate,
  euro.exchangeRate,
  euro.code
);

const toUSD = new CurrencyConverter(
  150,
  euro.exchangeRate,
  usd.exchangeRate,
  usd.code
);

console.log(toEoro.convert());
console.log(toUSD.convert());

const toEoro2 = new CurrencyAdapter(usd, euro);
const toUSD2 = new CurrencyAdapter(euro, usd);
console.log(toEoro2.convert(100));
console.log(toUSD2.convert(150));
