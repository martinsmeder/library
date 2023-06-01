import {
  app,
  auth,
  db,
  collection,
  addDoc,
  deleteDoc,
  doc,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from './firebase.js';

import { BookFactory, BookModule } from './appLogic.js';

const overlay = document.getElementById('overlay'); // To open form in front of page content
const formBtn = document.querySelector('button');
const formContainer = document.querySelector('#formContainer');

function addBookToTable(newBook) {
  const table = document.querySelector('tbody');

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
  const isReadBtn = document.createElement('button');
  isReadBtn.textContent = newBook.isRead ? 'Read' : 'Not read';
  tableRow.appendChild(isReadCell);
  isReadCell.appendChild(isReadBtn);

  const deleteCell = document.createElement('td');
  const deleteBtn = document.createElement('button');
  deleteBtn.textContent = 'Delete';
  tableRow.appendChild(deleteCell);
  deleteCell.appendChild(deleteBtn);

  deleteBtn.addEventListener('click', () => {
    BookModule.deleteBookFromArray(newBook);
    table.removeChild(tableRow);
  });

  table.appendChild(tableRow);
}

function handleBookForm() {
  const bookForm = document.getElementById('bookForm');

  bookForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = new FormData(bookForm);
    const title = formData.get('title');
    const author = formData.get('author');
    const pages = formData.get('pages');
    const isRead = formData.get('isRead') === 'on'; // Convert checkbox value to boolean

    const newBook = BookModule.addBookToArray(title, author, pages, isRead);
    try {
      const bookId = await BookModule.addBookToFirestore(newBook);
      console.log('Book ID:', bookId);
      displayBooks();
      // BookModule.deleteBookFromArray(newBook); // Delete from local array
      // await BookModule.deleteBookFromFirestore(bookId); // Delete from Firestore
    } catch (error) {
      console.error('Error adding/deleting book:', error);
    }

    console.log(BookModule.myLibrary);
    bookForm.reset();
    formContainer.style.display = 'none';
    overlay.style.display = 'none';
  });
}

formBtn.addEventListener('click', () => {
  overlay.style.display = 'block'; // Activate overlay
  formContainer.style.display = 'block'; // Activate overlay
  handleBookForm();
});

// Display all books in table
function displayBooks() {
  BookModule.myLibrary.forEach((newBook) => {
    addBookToTable(newBook);
  });
}

displayBooks();

// // Login button event listener
// const loginBtn = document.getElementById('loginBtn');
// loginBtn.addEventListener('click', () => {
//   const email = document.getElementById('email').value;
//   const password = document.getElementById('password').value;
//   signInWithEmailAndPassword(auth, email, password)
//     .then((userCredential) => {
//       // User logged in successfully
//       const user = userCredential.user;
//       console.log('Logged in:', user);
//     })
//     .catch((error) => {
//       // Handle login error
//       const errorCode = error.code;
//       const errorMessage = error.message;
//       console.error('Login error:', errorCode, errorMessage);
//     });
// });

// // Create account button event listener
// const createAccountBtn = document.getElementById('createAccountBtn');
// createAccountBtn.addEventListener('click', () => {
//   const email = document.getElementById('newEmail').value;
//   const password = document.getElementById('newPassword').value;
//   createUserWithEmailAndPassword(auth, email, password)
//     .then((userCredential) => {
//       // User account created successfully
//       const user = userCredential.user;
//       console.log('Account created:', user);
//     })
//     .catch((error) => {
//       // Handle account creation error
//       const errorCode = error.code;
//       const errorMessage = error.message;
//       console.error('Account creation error:', errorCode, errorMessage);
//     });
// });
