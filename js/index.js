const form = document.querySelector('#bookForm');
form.addEventListener('submit', createBook);
const bookRow = document.querySelector('#bookRow');
bookRow.addEventListener('click', removeBookOrChangeStatus);

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
        if (bookLength == index) {
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

  static incrementId() {
    this.id += 1;
  }
}

class Design {
  static addBookToList(newBook) {
    let status = '';
    if (newBook.readStatus == true) {
      status = `
       <div class="form-check ">
        <label class="form-check-label changeStatus" data-identity="${newBook.id}">
          <input type="checkbox" class="form-check-input changeStatus" data-identity="${newBook.id}" checked />
          You have read this book!
        </label>
       </div>
      `;
    } else {
      status = `
       <div class="form-check ">
         <label class="form-check-label changeStatus" data-identity="${newBook.id}">
           <input type="checkbox" class="form-check-input changeStatus" data-identity="${newBook.id}"/>
           You should read this book!
         </label>
       </div>
      `;
    }
    const bookRow = document.querySelector('#bookRow');
    const itemDiv = document.createElement('article');
    itemDiv.className = 'col-lg-3 col-md-4 col-sm-6';
    itemDiv.innerHTML = `
          <div class="card bbg">
            <div class="card-header cardHeader">
              <div class="titleDiv bg_White p_10 br_30">
                <p class="text-success ta_center titleP">
                  ${newBook.bookTitle}
                </p>
              </div>
            </div>
            <div class="card-body">
              <div class="pagesDiv ">
                <p class="text-muted ta_center">
                  <span class="bg_White p_10 br_30">
                    ${newBook.noOfPages} Pages
                  </span>
                </p>
              </div>
              <div>
                <p class=" ta_center ">
                  <a class="btn btn-sm btn-outline-danger br_30 removeBtn" id="${newBook.id}">
                    Remove Book
                  </a>
                </p>
              </div>
              <div class="byDiv">
                <p class="ta_center text-muted mb_10">
                  BY
                </p>
                <p class="text-info ta_center bg_White p_10 br_30">
                  ${newBook.author}
                </p>
              </div>
            </div>
            <div class="card-footer text-muted">
              ${status}
            </div>
          </div>
          `;

    bookRow.appendChild(itemDiv);
  }

  static clearFields() {
    document.querySelector('#author').value = '';
    document.querySelector('#bookTitle').value = '';
    document.querySelector('#noOfPages').value = '';
  }

  static displayBooks() {
    const books = BookStorage.getBooks();
    books.forEach(book => Design.addBookToList(book));
  }

  static deleteBook(et) {
    if (confirm('sure to remove this book?') == true) {
      BookStorage.remBook(et.id);
      et.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.remove();
    }
  }

  static editStatus(id) {
    if (confirm('sure to change book status?') == true) {
      BookStorage.updateStatus(id);
    }
  }
}

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
      if (book.id == id) {
        books.splice(index, 1);
      }
    });

    localStorage.setItem('book', JSON.stringify(books));
    window.location.reload();
  }

  static updateStatus(id) {
    const books = BookStorage.getBooks();
    books.forEach((book, index) => {
      if (book.id == id) {
        console.log(book.readStatus);
        if (book.readStatus == true) {
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

function createBook(e) {
  e.preventDefault();
  const id = Book.id;
  const author = document.querySelector('#author').value;
  const bookTitle = document.querySelector('#bookTitle').value;
  const noOfPages = document.querySelector('#noOfPages').value;
  const readStatus = document.querySelector('#readStatus').checked;
  const newBook = new Book(id, author, bookTitle, noOfPages, readStatus);
  BookStorage.addBook(newBook);
  Design.addBookToList(newBook);
  Design.clearFields();
  window.location.reload();
}

function removeBookOrChangeStatus(e) {
  e.preventDefault();
  if (e.target.classList.contains('removeBtn')) {
    Design.deleteBook(e.target);
  } else if (e.target.classList.contains('changeStatus')) {
    Design.editStatus(e.target.dataset.identity);
  }
}

document.addEventListener('DOMContentLoaded', Design.displayBooks);
