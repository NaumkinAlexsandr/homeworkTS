interface IGeometricFigure {
  x: number;
  y: number;
  draw(): void;
}

interface ICircle extends IGeometricFigure {
  radius: number;
}

interface IRectangle extends IGeometricFigure {
  height: number;
  width: number;
}

interface ITriangle extends IGeometricFigure {
  height: number;
  width: number;
}

interface IEllipse extends IGeometricFigure {
  radius: number;
}

abstract class Shape implements IGeometricFigure {
  constructor(public x: number, public y: number) {}

  draw(): void {}
}

class Circle extends Shape implements ICircle {
  constructor(x: number, y: number, public radius: number) {
    super(x, y);
  }

  draw(): void {
    console.log(
      `Drawing circle with radius ${this.radius} at (${this.x}, ${this.y})`
    );
  }
}

class Rectangle extends Shape implements IRectangle {
  constructor(
    x: number,
    y: number,
    public width: number,
    public height: number
  ) {
    super(x, y);
  }

  draw(): void {
    console.log(
      `Drawing rectangle with width ${this.width} and with height ${this.height} at (${this.x}, ${this.y})`
    );
  }
}

class Triangle extends Shape implements ITriangle {
  constructor(
    x: number,
    y: number,
    public width: number,
    public height: number
  ) {
    super(x, y);
  }

  draw(): void {
    console.log(
      `Drawing triangle with width ${this.width} and with height ${this.height} at (${this.x}, ${this.y})`
    );
  }
}

class Ellipse extends Shape implements IEllipse {
  constructor(x: number, y: number, public radius: number) {
    super(x, y);
  }
  draw(): void {
    console.log(
      `Drawing ellipse with radius ${this.radius} at (${this.x}, ${this.y})`
    );
  }
}

const circle = new Circle(250, 250, 50);
console.log(circle.draw());

const rectangle = new Rectangle(250, 250, 50, 50);
console.log(rectangle.draw());

const triangle = new Triangle(250, 250, 50, 50);
console.log(triangle.draw());

const ellipse = new Ellipse(250, 250, 50);
console.log(ellipse.draw());
