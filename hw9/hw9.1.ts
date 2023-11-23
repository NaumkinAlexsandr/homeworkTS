enum StatusBook {
  IsAvailable,
  NotAvailable,
}

interface IBook {
  title: string;
  author: string;
  status: StatusBook;
}

interface ILibrary {
  books: Book[];
}

interface IUser {
  name: string;
  phone: number;
}

class Book implements IBook {
  constructor(
    public title: string,
    public author: string,
    public status: StatusBook
  ) {}

  getTitle(): string {
    return this.title;
  }

  getAuthor(): string {
    return this.author;
  }
}

class Library implements ILibrary {
  constructor(public books: Book[]) {}

  addNewBook(title: string, author: string, status: StatusBook): void {
    const book = new Book(title, author, status);
    this.books.push(book);
    console.log(`Книга "${book.getTitle}" була додана до бібліотеки.`);
  }

  removeOldBook(title: string): void {
    const bookIndex = this.books.findIndex((book) => book.title === title);
    if (bookIndex !== -1) {
      const removedBook = this.books.splice(bookIndex, 1)[0];
      console.log(
        `Книга "${removedBook.getTitle()}" була видалена з бібліотеки.`
      );
    } else {
      console.log(`Книга з назвою "${title}" не знайдена в бібліотеці.`);
    }
  }

  borrowBook(title: string): void {
    const book = this.books.find((book) => book.title === title);
    if (book) {
      if (book.status === StatusBook.IsAvailable) {
        book.status = StatusBook.NotAvailable;
        console.log(`Книга "${book.getTitle()}" була узята з бібліотеки.`);
      } else {
        console.log(`Книга "${book.getTitle()}" вже зайнята.`);
      }
    } else {
      console.log(`Книга з назвою "${title}" не знайдена в бібліотеці.`);
    }
  }

  returnBook(title: string): void {
    const book = this.books.find((book) => book.title === title);
    if (book) {
      if (book.status === StatusBook.NotAvailable) {
        book.status = StatusBook.IsAvailable;
        console.log(`Книга "${book.getTitle()}" була повернена у бібліотеку.`);
      } else {
        console.log(`Книга "${book.getTitle()}" вже доступна.`);
      }
    } else {
      console.log(`Книга з назвою "${title}" не знайдена в бібліотеці.`);
    }
  }
}

class User implements IUser {
  constructor(
    public name: string,
    public phone: number,
    public book: Library
  ) {}

  borrowBook(title: string) {
    this.book.borrowBook(title);
    console.log(`Користувач ${this.name} узяв книгу ${title} з бібліотеки`);
  }
  returnBook(title: string) {
    this.book.returnBook(title);
    console.log(`Користувач ${this.name} повернув книгу ${title} у бібліотеку`);
  }
}

const book1 = new Book("Кобзар", "Тарас Шевченко", 0);
const book2 = new Book("Лісова пісня", "Леся Українка", 0);
const library = new Library([book1, book2]);
const user = new User("Микола", 1234567890, library);
library.addNewBook("Таємниці Прадавнього лісу", "Леся Українка", 0);
library.addNewBook("Захар Беркут", "Іван Франко", 0);
library.addNewBook("Захар Беркут 2", "Іван Франко", 0);

// console.log(library); // ok
// console.log(library.books[2]);  // ok
// console.log(library.removeOldBook("Захар Беркут 2"));  // ok
// console.log(library.borrowBook("Кобзар")); // ok
// console.log(library.borrowBook("Захар Беркут")); // ok
// console.log(library);
// console.log(library.returnBook("Кобзар")); // ok
// console.log(library);

console.log(user.borrowBook("Кобзар")); // ok
console.log(user.returnBook("Кобзар")); // ok

console.log(library);
