interface IProduct {
  id: string;
  name: string;
  price: number;
}

class Product implements IProduct {
  constructor(public id: string, public name: string, public price: number) {}

  public getName(): string {
    return this.name;
  }

  public getPrice(): number {
    return this.price;
  }
}

class ProductCollection {
  private products: IProduct[];

  constructor() {
    this.products = [];
  }

  public addProduct(product: IProduct): void {
    this.products.push(product);
  }

  public getProducts(): IProduct[] {
    return this.products;
  }

  createIterator(): Iterator<IProduct> {
    return new ProductIterator(this.products);
  }
}

interface Iterator<T> {
  next(): IteratorResult<T, any>;
  hasNext(): boolean;
}

class ProductIterator implements Iterator<IProduct> {
  private products: IProduct[];
  private index: number;

  constructor(products: IProduct[]) {
    this.products = products;
    this.index = 0;
  }

  public next(): IteratorResult<IProduct, any> {
    if (this.index < this.products.length) {
      return { value: this.products[this.index++] };
    } else {
      return { done: true, value: null };
    }
  }

  public hasNext(): boolean {
    return this.index < this.products.length;
  }
}

const collection = new ProductCollection();

collection.addProduct(new Product("1", "Product 1", 10));
collection.addProduct(new Product("2", "Product 2", 20));
collection.addProduct(new Product("3", "Product 3", 30));
collection.addProduct(new Product("4", "Product 4", 25));
collection.addProduct(new Product("5", "Product 5", 15));
collection.addProduct(new Product("6", "Product 6", 12));

const iterator = collection.createIterator();

while (iterator.hasNext()) {
  const product = iterator.next().value;
  console.log(
    `${product.getName()} price: ${product.getPrice()} USD. ID number: ${
      product.id
    }.`
  );
}
