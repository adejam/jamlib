const form = document.querySelector('#bookForm');
form.addEventListener('submit', createBook);
class Book {
  constructor(author, bookTitle, noOfPages, readStatus) {
    this.author = author;
    this.bookTitle = bookTitle;
    this.noOfPages = noOfPages;
    this.readStatus = readStatus;
  }
}

function createBook(e) {
  e.preventDefault();
  const author = document.querySelector('#author').value;
  const bookTitle = document.querySelector('#bookTitle').value;
  const noOfPages = document.querySelector('#noOfPages').value;
  const readStatus = document.querySelector('#readStatus').checked;
  const newBook = new Book(author, bookTitle, noOfPages, readStatus);
}
