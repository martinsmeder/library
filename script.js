const table = document.querySelector('tbody');
const formContainer = document.querySelector('#formContainer');
const formBtn = document.querySelector('button');

// Constructor function for creating a Book object
function Book(title, author, pages, isRead) {
  // Set properties of the Book object
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.isRead = isRead;
  this.info = () => `${title} by ${author}, ${pages}, ${isRead}`;
}

// Array of books using the Book constructor function
const myLibrary = [
  new Book('The Hobbit', 'J.R.R. Tolkien', '295 pages', false),
  new Book('The Enchiridion', 'Epictetus', '28 pages', true),
  new Book('The Prince', 'Niccolo Machiavelli', '144 pages', false),
];

// Append new book to table
function appendBook(newBook) {
  // Create table row element
  const tableRow = document.createElement('tr');

  // Create table cell elements
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

  // Create delete button
  const deleteBtn = document.createElement('button');
  deleteBtn.textContent = 'Delete';
  tableRow.appendChild(deleteBtn);

  // Append new row to table body
  table.appendChild(tableRow);

  // Add eventListener to delete row from table
  deleteBtn.addEventListener('click', () => {
    // Get index of the book object with clicked delete button
    const index = myLibrary.indexOf(newBook);
    // Check if the book object is present in myLibrary array. If no object is found,
    // indexOf will return -1, so any value above -1 means it is present in array.
    if (index > -1) {
      // Remove '1' item from the myLibrary array at the position specified by 'index'
      myLibrary.splice(index, 1);
    }
    // Remove table row from table
    table.removeChild(tableRow);
  });
}

// Handle form submission
function handleFormSubmit(e) {
  // prevent form from submitting and refreshing the page
  e.preventDefault();

  // Get form input values
  const title = e.target.elements.title.value;
  const author = e.target.elements.author.value;
  const pages = e.target.elements.pages.value;
  const isRead = e.target.elements.isRead.checked;

  // Create new Book object with form input values
  const newBook = new Book(title, author, pages, isRead);

  // Add book object to library array and append it to table
  myLibrary.push(newBook);
  appendBook(newBook);

  // Clear form fields
  e.target.reset();

  // Remove form from page
  formContainer.removeChild(e.target);

  console.log(myLibrary);
}

// Open form to add new book
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

  // Add eventListener to submit button
  form.addEventListener('submit', (e) => {
    handleFormSubmit(e);
  });
}

// Open form on formBtn click
formBtn.addEventListener('click', openForm);

// Display all books in table
function displayBooks() {
  myLibrary.forEach((book) => {
    appendBook(book);
  });
}

displayBooks();

console.log(myLibrary);
