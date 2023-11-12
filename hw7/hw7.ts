function Memoize<T, A extends any[], R>(
  originalMethod: (...args: A) => R,
  context: ClassMethodDecoratorContext<T, (...args: A) => R>
) {
  if (context.kind !== "method") throw new Error("Method only");

  const cache = new Map<string, R>();

  function replacementFunc(this: T, ...args: A): R {
    const key = JSON.stringify(args);

    if (cache.has(key)) {
      console.log(`${String(context.name)} will be memoize`);
      return cache.get(key) as R;
    }

    const result = originalMethod.apply(this, args);
    cache.set(key, result);

    return result;
  }
  return replacementFunc;
}

function Debounce(delay: number) {
  return function (originalMethod: any, context: ClassMethodDecoratorContext) {
    if (context.kind !== "method") throw new Error("Method only");
    let timer: ReturnType<typeof setTimeout> | null = null;

    function replacementFunc(this: any, ...args: any[]) {
      if (timer !== null) {
        clearTimeout(timer);
      }

      timer = setTimeout(() => {
        originalMethod.apply(this, args);
      }, delay);
    }

    return replacementFunc;
  };
}

class Calculator {
  @Memoize
  add(a: number, b: number): number {
    return a + b;
  }

  @Debounce(1500)
  delayMethod() {
    console.log("Delay method after 1.5 seconds");
  }
}

const calculator = new Calculator();

console.log(calculator.add(5, 4));
console.log(calculator.delayMethod());
