import BookStorage from './storage.js';
import Design from './design.js';
import Book from './book.js';

const form = document.querySelector('#bookForm');
const bookRow = document.querySelector('#bookRow');
const search = document.querySelector('#searchBig');
const searchi = document.querySelector('#searchSmall');

function createBook(e) {
  e.preventDefault();
  const { id } = Book;
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

form.addEventListener('submit', createBook);

function removeBookOrChangeStatus(e) {
  e.preventDefault();
  if (e.target.classList.contains('removeBtn')) {
    Design.deleteBook(e.target);
  } else if (e.target.classList.contains('changeStatus')) {
    Design.editStatus(e.target.dataset.identity);
  }
}

bookRow.addEventListener('click', removeBookOrChangeStatus);

function searchBook(e) {
  e.preventDefault();
  const searchKey = e.target.value.toLowerCase();
  const titleP = document.getElementsByClassName('titleP');
  const titlePaArray = Array.from(titleP);
  titlePaArray.forEach(result => {
    const bookName = result.textContent;
    if (bookName.toLowerCase().indexOf(searchKey) !== -1) {
      result.parentElement.parentElement.parentElement.parentElement.style.display = 'block';
    } else {
      result.parentElement.parentElement.parentElement.parentElement.style.display = 'none';
    }
  });
}

search.addEventListener('keyup', searchBook);
searchi.addEventListener('keyup', searchBook);

document.addEventListener('DOMContentLoaded', Design.displayBooks);
