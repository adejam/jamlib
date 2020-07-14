import BookStorage from './storage';

class Book {
  constructor(id, author, bookTitle, noOfPages, readStatus) {
    if (localStorage.getItem('book') === null) {
      this.id = 0;
    } else {
      let id;
      const books = BookStorage.getBooks();
      let bookLength = books.length;
      bookLength -= 1;
      books.forEach((book, index) => {
        if (bookLength === index) {
          id = book.id + 1;
        }
      });
      this.id = id;
    }
    this.author = author;
    this.bookTitle = bookTitle;
    this.noOfPages = noOfPages;
    this.readStatus = readStatus;
  }
}

export default Book;
