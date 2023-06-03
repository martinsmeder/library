import {
  app,
  auth,
  db,
  provider,
  collection,
  getDocs,
  query,
  where,
  addDoc,
  deleteDoc,
  updateDoc,
  doc,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
} from './firebase.js';

import { BookFactory, BookModule } from './appLogic.js';

const Renderer = (() => {
  const table = document.querySelector('tbody');
  const userText = document.getElementById('user');
  const loginBtn = document.getElementById('loginBtn');

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
      const user = auth.currentUser;
      if (user) {
        try {
          await BookModule.toggleReadInFirestore(newBook, user.uid);
          isReadBtn.textContent = newBook.isRead ? 'Read' : 'Not read';
        } catch (error) {
          console.error('Error toggling book read status:', error);
        }
      } else {
        BookModule.toggleReadInArray(newBook);
        isReadBtn.textContent = newBook.isRead ? 'Read' : 'Not read';
      }
    });
    tableRow.appendChild(isReadCell);
    isReadCell.appendChild(isReadBtn);

    const deleteCell = document.createElement('td');
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.addEventListener('click', async () => {
      const user = auth.currentUser;
      if (user) {
        try {
          await BookModule.deleteBookFromFirestore(newBook, user.uid);
          BookModule.deleteBookFromArray(newBook);
          table.removeChild(tableRow);
        } catch (error) {
          console.error('Error deleting book:', error);
        }
      } else {
        BookModule.deleteBookFromArray(newBook);
        table.removeChild(tableRow);
      }
    });
    tableRow.appendChild(deleteCell);
    deleteCell.appendChild(deleteBtn);

    table.appendChild(tableRow);
  };

  const displayBooks = async () => {
    table.textContent = '';

    // User is not signed in, display books from the local array
    if (!auth.currentUser) {
      BookModule.myLibrary.forEach((newBook) => {
        addBookToTable(newBook);
      });
      return;
    }

    // User is signed in, display books from Firestore
    try {
      const books = await BookModule.getAllBooksFromFirestore(
        auth.currentUser.uid
      );
      books.forEach((book) => {
        addBookToTable(book);
      });
    } catch (error) {
      console.error('Error getting books from Firestore:', error);
    }
  };

  const updateLoginStatus = (user) => {
    if (user) {
      userText.textContent = user.email;
      loginBtn.textContent = 'Log Out';
    } else {
      userText.textContent = '';
      loginBtn.textContent = 'Log In';
    }
  };

  return {
    addBookToTable,
    displayBooks,
    updateLoginStatus,
  };
})();

const Controller = (() => {
  const overlay = document.getElementById('overlay');
  const formBtn = document.querySelector('#formBtn');
  const formContainer = document.querySelector('#formContainer');
  const bookForm = document.getElementById('bookForm');
  const loginBtn = document.getElementById('loginBtn');
  const table = document.querySelector('tbody');

  const handleBookForm = async (e) => {
    e.preventDefault();
    const formData = new FormData(bookForm);
    const title = formData.get('title');
    const author = formData.get('author');
    const pages = formData.get('pages');
    const isRead = formData.get('isRead') === 'on'; // Convert checkbox value to boolean

    const user = auth.currentUser;
    if (user) {
      // User is signed in, save the book to Firestore and update the local array
      const newBook = BookModule.addBookToArray(title, author, pages, isRead);
      try {
        const bookId = await BookModule.addBookToFirestore(newBook, user.uid);
        newBook.id = bookId;
        await Renderer.addBookToTable(newBook);
      } catch (error) {
        console.error('Error saving book:', error);
      }
    } else {
      // User is not signed in, add the book only to the local array
      BookModule.addBookToArray(title, author, pages, isRead);
      await Renderer.displayBooks();
    }

    console.log(BookModule.myLibrary);
    bookForm.reset();
    formContainer.style.display = 'none';
    overlay.style.display = 'none';
  };

  const handleLoginBtn = () => {
    const user = auth.currentUser;
    if (user) {
      // User is already signed in, sign out
      signOut(auth)
        .then(() => {
          Renderer.updateLoginStatus(null);
          table.textContent = '';
        })
        .catch((error) => {
          console.error('Sign out error:', error);
        });
    } else {
      // User is not signed in, show Google sign-in popup
      signInWithPopup(auth, provider)
        .then((result) => {
          table.textContent = ''; // Clear the book table
          const user = result.user;
          Renderer.updateLoginStatus(user);
          // Renderer.displayBooks();
        })
        .catch((error) => {
          console.error('Sign in error:', error);
        });
    }
  };

  const initialize = async () => {
    formBtn.addEventListener('click', () => {
      overlay.style.display = 'block';
      formContainer.style.display = 'block';
    });

    bookForm.addEventListener('submit', handleBookForm);

    loginBtn.addEventListener('click', handleLoginBtn);

    onAuthStateChanged(auth, (user) => {
      Renderer.updateLoginStatus(user);
      Renderer.displayBooks();
    });

    await Renderer.displayBooks();
  };

  return {
    initialize,
  };
})();

Controller.initialize();
