// ------------------------------------ Task №1

interface IPerson {
  [key: string]: number | string;
}

const person: IPerson = {
  name: "John",
  surname: "Lennon",
  age: 30,
};

console.log(person);

// ------------------------------------ Task №2

interface IGreet {
  [key: string]: (arg: any, arg2: any) => void;
}

const sayHello: IGreet = {
  greet: (fullName: string, age: number) => {
    return `Hello, I'm ${fullName} and I'm ${age} years old`;
  },
};

if ("greet" in sayHello) {
  console.log(sayHello["greet"]("John Lennon", 30));
} else {
  console.log("Method not found");
}

// ------------------------------------ Task №3

interface IUsers {
  [key: number]: {
    name: string;
    age: number;
  }[];
}

const users2: IUsers = {
  0: [
    { name: "John", age: 25 },
    { name: "Jane", age: 30 },
    { name: "Bob", age: 35 },
  ],
  1: [
    { name: "Bill", age: 25 },
    { name: "Alex", age: 30 },
    { name: "Kate", age: 35 },
  ],
  2: [
    { name: "Polina", age: 25 },
    { name: "Jane", age: 30 },
    { name: "Stive", age: 35 },
  ],
};

console.log(users2[2]);

// ------------------------------------ Task №4

interface IUser {
  [key: string]: any;
  name: string;
}

const john: IUser = {
  name: "John",
  age: 30,
  email: "john@gmail.com",
  man: true,
  address: {
    street: "123 Collins St",
    city: "New York",
  },
};

console.log(john);

// ------------------------------------ Task №5

interface IAnimals {
  [key: string]: string | number;
  name: string;
  age: number;
}

interface IPets extends IAnimals {
  [key: string]: any;
  voice: string;
}

const cat: IPets = {
  name: "Kuzya",
  age: 5,
  voice: "meow",
  vaccination: {
    rabies: true,
    leptospirosis: true,
    piroplasmosis: false,
  },
};

console.log(cat);

// ------------------------------------ Task №6

const bill: IUser = {
  name: "Bill",
  age: 30,
  height: "181",
  weight: 85,
};

const mark: IUser = {
  name: "Mark",
  age: 30,
  height: 173,
  weight: 81,
};

function validateUser(
  user: IUser,
  param: { [key: string]: (value: number) => boolean }
): boolean {
  for (const key in param) {
    if (!param[key](user[key])) {
      return false;
    }
  }
  return true;
}

const isNumber = (value: number): boolean => {
  return typeof value === "number";
};

const param = {
  age: isNumber,
  height: isNumber,
  weight: isNumber,
};

const billIsValid = validateUser(bill, param);
const markIsValid = validateUser(mark, param);

console.log(billIsValid);
console.log(markIsValid);
