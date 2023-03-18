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

function appendBook(newBook) {
  const tableRow = document.createElement('tr');

  const titleCell = document.createElement('td');
  titleCell.textContent = newBook.title;
  tableRow.appendChild(titleCell);

  const authorCell = document.createElement('td');
  authorCell.textContent = newBook.author;
  tableRow.appendChild(authorCell);

  const pagesCell = document.createElement('td');
  pagesCell.textContent = newBook.pages;
  tableRow.appendChild(pagesCell);

  const isReadCell = document.createElement('td');
  isReadCell.textContent = newBook.isRead;
  tableRow.appendChild(isReadCell);

  table.appendChild(tableRow);
}

function handleFormSubmit(e) {
  e.preventDefault(); // prevent form from submitting and refreshing the page
  const title = e.target.elements.title.value;
  const author = e.target.elements.author.value;
  const pages = e.target.elements.pages.value;
  const isRead = e.target.elements.isRead.checked;

  const newBook = new Book(title, author, pages, isRead);

  myLibrary.push(newBook);
  appendBook(newBook);

  // Clear form fields
  e.target.reset();
}

function openForm() {
  const form = document.createElement('form');

  // Create form elements
  const titleLabel = document.createElement('label');
  titleLabel.textContent = 'Title: ';
  const titleInput = document.createElement('input');
  titleInput.type = 'text';
  titleInput.name = 'title'; // Add name attribute
  titleLabel.appendChild(titleInput);
  form.appendChild(titleLabel);

  const authorLabel = document.createElement('label');
  authorLabel.textContent = 'Author: ';
  const authorInput = document.createElement('input');
  authorInput.type = 'text';
  authorInput.name = 'author'; // Add name attribute
  authorLabel.appendChild(authorInput);
  form.appendChild(authorLabel);

  const pagesLabel = document.createElement('label');
  pagesLabel.textContent = 'Pages: ';
  const pagesInput = document.createElement('input');
  pagesInput.type = 'number';
  pagesInput.name = 'pages'; // Add name attribute
  pagesLabel.appendChild(pagesInput);
  form.appendChild(pagesLabel);

  const isReadLabel = document.createElement('label');
  isReadLabel.textContent = 'Read: ';
  const isReadInput = document.createElement('input');
  isReadInput.type = 'checkbox';
  isReadInput.name = 'isRead'; // Add name attribute
  isReadLabel.appendChild(isReadInput);
  form.appendChild(isReadLabel);

  // Add a submit button to the form
  const submitButton = document.createElement('button');
  submitButton.type = 'submit';
  submitButton.textContent = 'Submit';
  form.appendChild(submitButton);
  formContainer.appendChild(form);

  form.addEventListener('submit', (e) => {
    handleFormSubmit(e);
  });
}

function addBookToLibrary() {
  openForm();
}

formBtn.addEventListener('click', addBookToLibrary);

function displayBooks() {
  myLibrary.forEach((book) => {
    appendBook(book);
  });
}

displayBooks();

console.log(myLibrary);
