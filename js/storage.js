class BookStorage {
  static getBooks() {
    let books;
    if (localStorage.getItem('book') === null) {
      books = [];
    } else {
      books = JSON.parse(localStorage.getItem('book'));
    }

    return books;
  }

  static addBook(book) {
    const books = BookStorage.getBooks();
    books.push(book);
    localStorage.setItem('book', JSON.stringify(books));
  }

  static remBook(id) {
    const books = BookStorage.getBooks();
    books.forEach((book, index) => {
      if (book.id === id) {
        books.splice(index, 1);
      }
    });

    localStorage.setItem('book', JSON.stringify(books));
    window.location.reload();
  }

  static updateStatus(id) {
    const books = BookStorage.getBooks();
    books.forEach(book => {
      if (book.id === id) {
        if (book.readStatus === true) {
          book.readStatus = false;
        } else {
          book.readStatus = true;
        }
      }
    });
    localStorage.setItem('book', JSON.stringify(books));
    window.location.reload();
  }
}

export default BookStorage;
