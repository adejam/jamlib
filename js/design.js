import BookStorage from './storage';

class Design {
  static addBookToList(newBook) {
    let status = '';
    if (newBook.readStatus === true) {
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
    BookStorage.remBook(et.id);
    const f = et.parentElement.parentElement.parentElement;
    f.parentElement.parentElement.parentElement.remove();
  }

  static editStatus(id) {
    BookStorage.updateStatus(id);
  }
}

export default Design;
