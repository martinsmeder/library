// New book button with form for book details and submit button
// 4. Add details input
// 5. Make input into an object
// 6. Push object to array (original one, and delete books array)

const table = document.querySelector('tbody');
const formContainer = document.querySelector('#formContainer');
const formBtn = document.querySelector('button');

// Constructor function
function Book(title, author, pages, isRead) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.isRead = isRead;
  this.info = () => `${title} by ${author}, ${pages}, ${isRead}`;
}

const myLibrary = [
  new Book('The Hobbit', 'J.R.R. Tolkien', '295 pages', 'not read yet'),
  new Book('The Enchiridion', 'Epictetus', '28 pages', 'is read'),
  new Book('The Prince', 'Niccolo Machiavelli', '144 pages', 'not read yet'),
];

// function appendBook(newBook) {
//   const tableRow = document.createElement('tr');

//   const titleCell = document.createElement('td');
//   titleCell.textContent = newBook.title;
//   tableRow.appendChild(titleCell);
//   table.appendChild(tableRow);
// }

function openForm() {
  const form = document.createElement('form');

  // Create form elements
  const titleLabel = document.createElement('label');
  titleLabel.textContent = 'Title: ';
  const titleInput = document.createElement('input');
  titleInput.type = 'text';
  titleLabel.appendChild(titleInput);
  form.appendChild(titleLabel);

  // Add a submit button to the form
  const submitButton = document.createElement('button');
  submitButton.type = 'submit';
  submitButton.textContent = 'Submit';
  form.appendChild(submitButton);
  formContainer.appendChild(form);
}

function addBookToLibrary() {
  openForm();
  // const bookInput = prompt('Book: ');
  // const newBook = new Book(bookInput);
  // myLibrary.push(newBook);
  // appendBook(newBook);
  // myLibrary.push(...books);
}

formBtn.addEventListener('click', addBookToLibrary);

function displayBooks() {
  myLibrary.forEach((book) => {
    const tableRow = document.createElement('tr');

    const titleCell = document.createElement('td');
    titleCell.textContent = book.title;
    tableRow.appendChild(titleCell);

    const authorCell = document.createElement('td');
    authorCell.textContent = book.author;
    tableRow.appendChild(authorCell);

    const pagesCell = document.createElement('td');
    pagesCell.textContent = book.pages;
    tableRow.appendChild(pagesCell);

    const isReadCell = document.createElement('td');
    isReadCell.textContent = book.isRead;
    tableRow.appendChild(isReadCell);

    table.appendChild(tableRow);
  });
}

displayBooks();

console.log(myLibrary);
