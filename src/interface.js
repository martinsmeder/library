import {
  app,
  auth,
  db,
  collection,
  addDoc,
  deleteDoc,
  updateDoc,
  doc,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from './firebase.js';

import { BookFactory, BookModule } from './appLogic.js';

const Renderer = (() => {
  const table = document.querySelector('tbody');

  const addBookToTable = (newBook) => {
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
    isReadBtn.addEventListener('click', async () => {
      try {
        await BookModule.toggleIsRead(newBook);
        isReadBtn.textContent = newBook.isRead ? 'Read' : 'Not read';
      } catch (error) {
        console.error('Error toggling book read status:', error);
      }
    });
    tableRow.appendChild(isReadCell);
    isReadCell.appendChild(isReadBtn);

    const deleteCell = document.createElement('td');
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.addEventListener('click', async () => {
      try {
        await BookModule.deleteBookFromFirestore(newBook);
        BookModule.deleteBookFromArray(newBook);
        table.removeChild(tableRow);
      } catch (error) {
        console.error('Error deleting book:', error);
      }
    });
    tableRow.appendChild(deleteCell);
    deleteCell.appendChild(deleteBtn);

    table.appendChild(tableRow);
  };

  const displayBooks = () => {
    table.textContent = '';

    BookModule.myLibrary.forEach((newBook) => {
      addBookToTable(newBook);
    });
  };

  return {
    addBookToTable,
    displayBooks,
  };
})();

const Controller = (() => {
  const overlay = document.getElementById('overlay');
  const formBtn = document.querySelector('button');
  const formContainer = document.querySelector('#formContainer');
  const bookForm = document.getElementById('bookForm');

  const handleBookForm = async (e) => {
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
      Renderer.displayBooks();
    } catch (error) {
      console.error('Error adding/deleting book:', error);
    }

    console.log(BookModule.myLibrary);
    bookForm.reset();
    formContainer.style.display = 'none';
    overlay.style.display = 'none';
  };

  const initialize = () => {
    formBtn.addEventListener('click', () => {
      overlay.style.display = 'block';
      formContainer.style.display = 'block'; //
    });

    bookForm.addEventListener('submit', handleBookForm);

    Renderer.displayBooks();
  };

  return {
    initialize,
  };
})();

Controller.initialize();

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
