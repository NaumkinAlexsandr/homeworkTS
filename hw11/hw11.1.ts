interface ICurrency {
  name: string;
  code: string;
  symbol: string;
  exchangeRate: number;
}

interface ICurrencyConverter {
  amount: number;
  exchangeRateOne: number;
  exchangeRateTwo: number;
  code: string;
  convert(): string;
}

interface INewCurrencyConverter {
  amount: number;
  exchangeRateOne: number;
  exchangeRateTwo: number;
  symbolOne: string;
  symbolTwo: string;
  newConvert(): string;
}

class USDCurrency implements ICurrency {
  name: string;
  code: string;
  symbol: string;
  exchangeRate: number;

  constructor() {
    this.name = "US Dollar";
    this.code = "USD";
    this.symbol = "$";
    this.exchangeRate = 0.9;
  }
  getCurrencyName(): string {
    return this.name;
  }

  getCurrencyCode(): string {
    return this.code;
  }

  getCurrencySymbol(): string {
    return this.symbol;
  }

  getCurrencyExchangeRate(): number {
    return this.exchangeRate;
  }
}

class EuroCurrency implements ICurrency {
  name: string;
  code: string;
  symbol: string;
  exchangeRate: number;
  constructor() {
    this.name = "Euro";
    this.code = "EUR";
    this.symbol = "€";
    this.exchangeRate = 1;
  }
  getCurrencyName(): string {
    return this.name;
  }

  getCurrencyCode(): string {
    return this.code;
  }

  getCurrencySymbol(): string {
    return this.symbol;
  }

  getCurrencyExchangeRate(): number {
    return this.exchangeRate;
  }
}

class CurrencyConverter implements ICurrencyConverter {
  constructor(
    public amount: number,
    public exchangeRateOne: number,
    public exchangeRateTwo: number,
    public code: string
  ) {}
  convert(): string {
    const convertedAmount =
      this.amount * this.exchangeRateOne * this.exchangeRateTwo;
    return `${convertedAmount} ${this.code}`;
  }
}

class NewCurrencyConverter implements INewCurrencyConverter {
  constructor(
    public amount: number,
    public exchangeRateOne: number,
    public exchangeRateTwo: number,
    public symbolOne: string,
    public symbolTwo: string
  ) {}
  newConvert(): string {
    const newConvertedAmount =
      (this.exchangeRateOne / this.exchangeRateTwo) * this.amount;
    return `If you exchange ${this.symbolOne} ${
      this.amount
    }, you will receive ${this.symbolTwo} ${newConvertedAmount.toFixed(2)}`;
  }
}

class CurrencyAdapter implements ICurrency {
  private currencyConverter: NewCurrencyConverter;

  constructor(private currency: ICurrency, private getCurrency: ICurrency) {
    this.currencyConverter = new NewCurrencyConverter(
      1,
      currency.exchangeRate,
      getCurrency.exchangeRate,
      currency.symbol,
      getCurrency.symbol
    );
  }

  get name(): string {
    return this.currency.name;
  }

  get code(): string {
    return this.currency.code;
  }

  get symbol(): string {
    return this.currency.symbol;
  }

  get exchangeRate(): number {
    return this.currency.exchangeRate;
  }

  newConvert(amount: number): string {
    this.currencyConverter.amount = amount;
    return this.currencyConverter.newConvert();
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

const toEoro2 = new NewCurrencyConverter(
  100,
  usd.exchangeRate,
  euro.exchangeRate,
  usd.symbol,
  euro.symbol
);

const toUSD2 = new NewCurrencyConverter(
  100,
  euro.exchangeRate,
  usd.exchangeRate,
  euro.symbol,
  usd.symbol
);

console.log(toEoro2.newConvert());
console.log(toUSD2.newConvert());

const toEoro3 = new CurrencyAdapter(usd, euro);
const toUSD3 = new CurrencyAdapter(euro, usd);
console.log(toEoro3.newConvert(100));
console.log(toUSD3.newConvert(100));
