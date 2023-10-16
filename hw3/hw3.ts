interface IGeometricFigure {
  readonly name: string;
  readonly color: string;
  calculateArea(): void;
}

interface ICircle {
  radius: number;
}

interface IRectangle {
  height: number;
  width: number;
}

interface ISquare {
  height: number;
  width: number;
}

interface ITriangle {
  height: number;
  width: number;
}

interface ICalculationFormula {
  print(): string;
}

abstract class Shape implements IGeometricFigure {
  constructor(readonly name: string, readonly color: string) {}

  calculateArea(): void {}
}

class Circle extends Shape implements ICircle {
  constructor(
    readonly name: string,
    readonly color: string,
    public radius: number
  ) {
    super(name, color);
  }

  calculateArea(): number {
    return Math.PI * (this.radius * this.radius);
  }
}

class Rectangle extends Shape implements IRectangle, ICalculationFormula {
  constructor(
    readonly name: string,
    readonly color: string,
    public height: number,
    public width: number
  ) {
    super(name, color);
  }

  calculateArea(): number {
    return this.height * this.width;
  }

  print(): string {
    return `
    S = a * b
    a - height = ${this.height}
    b - width = ${this.width}`;
  }
}

class Square extends Shape implements ISquare, ICalculationFormula {
  constructor(
    readonly name: string,
    readonly color: string,
    public height: number,
    public width: number
  ) {
    super(name, color);
  }

  calculateArea(): number {
    return this.height * this.width;
  }

  print(): string {
    return `
    S = a * b
    a - height = ${this.height}
    b - width = ${this.width}`;
  }
}

class Triangle extends Shape implements ITriangle {
  constructor(
    readonly name: string,
    readonly color: string,
    public height: number,
    public width: number
  ) {
    super(name, color);
  }

  calculateArea(): number {
    return (this.height * this.width) / 2;
  }
}

const circl = new Circle("Circle", "blue", 2);
console.log(`Figure name: ${circl.name} `);
console.log(`Figure color:  ${circl.color}`);
console.log(`Figure area = ${circl.calculateArea()}`);

const rectangle = new Rectangle("Rectangle", "red", 3, 4);
console.log(`Figure name: ${rectangle.name} `);
console.log(`Figure color:  ${rectangle.color}`);
console.log(`Figure area = ${rectangle.calculateArea()}`);
console.log(`Formula for calculating area rectangle: ${rectangle.print()}`);

const square = new Square("Square", "black", 2, 2);
console.log(`Figure name: ${square.name} `);
console.log(`Figure color:  ${square.color}`);
console.log(`Figure area = ${square.calculateArea()}`);
console.log(`Formula for calculating area square: ${square.print()}`);

const triangle = new Triangle("Triangle", "green", 2, 2);
console.log(`Figure name: ${triangle.name} `);
console.log(`Figure color:  ${triangle.color}`);
console.log(`Figure area = ${triangle.calculateArea()}`);
