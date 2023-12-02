interface IObserver {
  update(data: any): void;
}

class Subject {
  private observers: IObserver[] = [];

  subscribe(observer: IObserver): void {
    this.observers.push(observer);
  }

  unsubscribe(observer: IObserver): void {
    const index = this.observers.indexOf(observer);
    if (index !== -1) {
      this.observers.splice(index, 1);
    }
  }

  notify(data: any) {
    for (const observer of this.observers) {
      observer.update(data);
    }
  }
}

class StockObserver implements IObserver {
  private stockPrice: number;

  constructor(stockPrice: number) {
    this.stockPrice = stockPrice;
  }

  update(data: any): void {
    this.stockPrice = data;
    console.log(`New price: ${data}`);
  }
}

const subject = new Subject();

const stockObserver1 = new StockObserver(120);
const stockObserver2 = new StockObserver(150);

subject.subscribe(stockObserver1);
subject.subscribe(stockObserver2);
subject.unsubscribe(stockObserver2);

subject.notify(100);
