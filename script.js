const overlay = document.getElementById('overlay'); // To open form in front of page content
const table = document.querySelector('tbody');
const formContainer = document.querySelector('#formContainer');
const formBtn = document.querySelector('button');

// Class for creating a Book object
class Book {
  constructor(title, author, pages, isRead) {
    // Set properties of the Book object
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.isRead = isRead;
    this.info = () => `${title} by ${author}, ${pages}, ${isRead}`;
  }

  // Define a toggleRead() method on the Book class
  toggleRead() {
    // Invert current value (so read --> not read, and not read --> read)
    this.isRead = !this.isRead;
  }
}

// Create an array of books using the Book class
const myLibrary = [
  new Book('The Laws of Human Nature', 'Robert Greene', '624', true),
  new Book('The Enchiridion', 'Epictetus', '28', true),
  new Book('The Prince', 'Niccolo Machiavelli', '144', false),
];

// Append new book to table and handle click events
function appendBook(newBook) {
  // Create table row element
  const tableRow = document.createElement('tr');

  // Create title cell element
  const titleCell = document.createElement('td');
  titleCell.textContent = newBook.title;
  tableRow.appendChild(titleCell);

  // Create author cell element
  const authorCell = document.createElement('td');
  authorCell.textContent = newBook.author;
  tableRow.appendChild(authorCell);

  // Create page cell element
  const pagesCell = document.createElement('td');
  pagesCell.textContent = newBook.pages;
  tableRow.appendChild(pagesCell);

  // Create isRead cell and add button to it
  const isReadCell = document.createElement('td');
  const isReadBtn = document.createElement('button');
  isReadBtn.textContent = newBook.isRead ? 'Read' : 'Not read';
  tableRow.appendChild(isReadCell);
  isReadCell.appendChild(isReadBtn);

  // Add event listener to isRead button to toggle between read/not read
  isReadBtn.addEventListener('click', () => {
    newBook.toggleRead();
    isReadBtn.textContent = newBook.isRead ? 'Read' : 'Not read';
  });

  // Create delete button
  const deleteCell = document.createElement('td');
  const deleteBtn = document.createElement('button');
  deleteBtn.textContent = 'Delete';
  tableRow.appendChild(deleteCell);
  deleteCell.appendChild(deleteBtn);

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
  // Append new row to table body
  table.appendChild(tableRow);
}

// Open form to add new book
function openForm() {
  const form = document.createElement('form');

  // Create form elements
  const titleInput = document.createElement('input');
  titleInput.type = 'text';
  titleInput.name = 'title'; // Add name attribute
  titleInput.placeholder = 'Title';
  titleInput.required = true;
  form.appendChild(titleInput);

  const authorInput = document.createElement('input');
  authorInput.type = 'text';
  authorInput.name = 'author'; // Add name attribute
  authorInput.placeholder = 'Author';
  authorInput.required = true;
  form.appendChild(authorInput);

  const pagesInput = document.createElement('input');
  pagesInput.type = 'number';
  pagesInput.name = 'pages'; // Add name attribute
  pagesInput.placeholder = 'Pages';
  pagesInput.required = true;
  form.appendChild(pagesInput);

  const isReadLabel = document.createElement('label');
  isReadLabel.textContent = 'Have you read it? ';
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
    overlay.style.display = 'none'; // Hide overlay
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

// Open form on formBtn click
formBtn.addEventListener('click', () => {
  overlay.style.display = 'block'; // Activate overlay
  openForm();
});

// Display all books in table
function displayBooks() {
  myLibrary.forEach((book) => {
    appendBook(book);
  });
}

displayBooks();

console.log(myLibrary);
