interface IGeometricFigure {
  color: string;
  name: string;
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
  constructor(public color: string, public name: string) {}
  abstract getArea(): number;
}

class Circle extends Shape implements ICircle {
  constructor(
    public name: string,
    public color: string,
    public radius: number
  ) {
    super(color, name);
  }

  getArea(): number {
    return Math.PI * this.radius ** 2;
  }
}

class Rectangle extends Shape implements IRectangle {
  constructor(
    public name: string,
    public color: string,
    public height: number,
    public width: number
  ) {
    super(color, name);
  }

  getArea(): number {
    return this.height * this.width;
  }
}

class Triangle extends Shape implements ITriangle {
  constructor(
    public name: string,
    public color: string,
    public height: number,
    public width: number
  ) {
    super(color, name);
  }

  getArea(): number {
    return (this.width * this.height) / 2;
  }
}

function printArea(figure: IGeometricFigure): void {
  console.log(`${figure.name} area: ${figure.getArea()}`);
}

const circle = new Circle("Circle", "blue", 50);
const rectangle = new Rectangle("Rectangle", "red", 50, 50);
const triangle = new Triangle("Triangle", "black", 50, 50);

printArea(circle);
printArea(rectangle);
printArea(triangle);
