interface IGeometricFigure {
  color: string;

  getArea(): number;
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

abstract class Shape implements IGeometricFigure {
  constructor(public color: string) {}
  abstract getArea(): number;
}

class Circle extends Shape implements ICircle {
  constructor(public color: string, public radius: number) {
    super(color);
  }

  getArea(): number {
    return Math.PI * this.radius ** 2;
  }
}

class Rectangle extends Shape implements IRectangle {
  constructor(
    public color: string,
    public height: number,
    public width: number
  ) {
    super(color);
  }

  getArea(): number {
    return this.height * this.width;
  }
}

class Triangle extends Shape implements ITriangle {
  constructor(
    public color: string,
    public height: number,
    public width: number
  ) {
    super(color);
  }

  getArea(): number {
    return (this.width * this.height) / 2;
  }
}

const circle = new Circle("blue", 50);
console.log(`Circle area ${circle.getArea()}`);

const rectangle = new Rectangle("red", 50, 50);
console.log(`Rectangle area ${rectangle.getArea()}`);

const triangle = new Triangle("black", 50, 50);
console.log(`Triangle area ${triangle.getArea()}`);
