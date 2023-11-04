interface Person {
  name: string;
  age: number;
}

// -------------------------------------------- №1

type DeepReadonly<T> = T extends object
  ? { readonly [K in keyof T]: DeepReadonly<T[K]> }
  : T;

type ReadonlyPerson = DeepReadonly<Person>;

const john: ReadonlyPerson = {
  name: "John",
  age: 30,
};

// -------------------------------------------- №2

type DeepRequireReadonly<T> = {
  readonly [K in keyof T]: T[K] extends object
    ? DeepRequireReadonly<T[K]>
    : T[K];
};

type RequirePerson = DeepRequireReadonly<Person>;

const bill: RequirePerson = {
  name: "Bill",
  age: 30,
};

// -------------------------------------------- №3

type ToUppercase<T extends string> = `${Uppercase<T>}`;

type GetUppercase<T> = {
  [K in keyof T & string as ToUppercase<K>]: T[K];
};

type Uper = GetUppercase<Person>;

const kate: Uper = {
  NAME: "Kate",
  AGE: 25,
};

// -------------------------------------------- №4
enum Department {
  Supervisor,
  Deputy,
}

type JobTitle = Record<`get-${keyof typeof Department}`, () => void>;

const department: JobTitle = {
  "get-Supervisor": () => Department.Supervisor,
  "get-Deputy": () => Department.Deputy,
};

console.log(department["get-Supervisor"]);

// -------------------------------------------- №5

type ObjectToPropertyDescriptor<T> = {
  [K in keyof T]: PropertyDescriptor;
};

const pete: ObjectToPropertyDescriptor<Person> = {
  name: { value: "Pete" },
  age: { value: 30 },
};

console.log(pete.name.value);
console.log(pete.age.value);

// -------------------------------------------- №6

type ArrayElement<T extends any[]> = T extends (infer U)[] ? U : never;

function getFirstElement(arr: number[]): number {
  return arr[0];
}

type FirstElement = ArrayElement<Parameters<typeof getFirstElement>>; // number
