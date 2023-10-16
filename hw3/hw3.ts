interface GeometricFigure {
  readonly name: string;
  readonly color: string;
  calculateArea(): number;
}

interface CalculationFormula {
  print(): string;
}

class Circle implements GeometricFigure {
  constructor(
    readonly name: string,
    readonly color: string,
    public radius: number
  ) {}

  calculateArea(): number {
    return Math.PI * (this.radius * this.radius);
  }
}

class Rectangle implements GeometricFigure, CalculationFormula {
  constructor(
    readonly name: string,
    readonly color: string,
    public height: number,
    public width: number
  ) {}

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

class Square implements GeometricFigure, CalculationFormula {
  constructor(
    readonly name: string,
    readonly color: string,
    public height: number,
    public width: number
  ) {}

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

class Triangle implements GeometricFigure {
  constructor(
    readonly name: string,
    readonly color: string,
    public height: number,
    public width: number
  ) {}

  calculateArea(): number {
    return (this.height * this.width) / 2;
  }
}

abstract class Shape {
  constructor(protected name: string, protected color: string) {}

  calculateArea(): void {}
}

class Trapezoid extends Shape implements CalculationFormula {
  constructor(
    name: string,
    color: string,
    protected height: number,
    protected widthA: number,
    protected widthB: number
  ) {
    super(name, color);
    this.name = name;
    this.color = color;
    this.height = height;
    this.widthA = widthA;
    this.widthB = widthB;
  }

  get figureName(): string {
    return this.name;
  }

  get figureColor(): string {
    return this.color;
  }

  calculateArea(): number {
    return (1 / 2) * (this.widthA + this.widthB) * this.height;
  }

  print(): string {
    return `
    S = 1/2 * (a + b) * h
    h - height = ${this.height}
    a - width a = ${this.widthA}
    b - width b = ${this.widthB}`;
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

const trapezoid = new Trapezoid("Trapezoid", "gray", 4, 3, 6);
console.log(`Figure name: ${trapezoid.figureName}`);
console.log(`Figure color:  ${trapezoid.figureColor}`);
console.log(`Figure area = ${trapezoid.calculateArea()}`);
console.log(`Formula for calculating area trapezoid: ${trapezoid.print()}`);
