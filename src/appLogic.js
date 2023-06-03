// TO DO:
// 1. Get the logic to work with signed in user in the interface.js
// 2. Test all scenarios
// 3. Change back to class syntax ?
// 4. Move on with ur life

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
  GoogleAuthProvider,
  signOut,
  onAuthStateChanged,
} from './firebase.js';

export const BookFactory = (title, author, pages, isRead) => ({
  title,
  author,
  pages,
  isRead,
});

export const BookModule = (() => {
  const myLibrary = [];

  const addBookToArray = (title, author, pages, isRead) => {
    const newBook = BookFactory(title, author, pages, isRead);
    myLibrary.push(newBook);
    return newBook;
  };

  const addBookToFirestore = async (newBook, userId) => {
    try {
      const docRef = await addDoc(collection(db, 'users', userId, 'books'), {
        title: newBook.title,
        author: newBook.author,
        pages: newBook.pages,
        isRead: newBook.isRead,
        userId: userId,
      });

      console.log('Book added to Firestore:', docRef.id);
      newBook.bookId = docRef.id; // Store the book ID in the book object
      return newBook.bookId; // Return the book ID
    } catch (error) {
      console.error('Error adding book to Firestore:', error);
      throw error;
    }
  };

  const deleteBookFromArray = (book) => {
    const index = myLibrary.findIndex(
      (item) =>
        item.title === book.title &&
        item.author === book.author &&
        item.pages === book.pages &&
        item.isRead == book.isRead // Use loose equality or convert to the same type
    );
    if (index > -1) {
      myLibrary.splice(index, 1);
    }
  };

  const deleteBookFromFirestore = async (book, userId) => {
    try {
      await deleteDoc(doc(db, 'users', userId, 'books', book.bookId));
      console.log('Book deleted from Firestore:', book.bookId);
    } catch (error) {
      console.error('Error deleting book from Firestore:', error);
      throw error;
    }
  };

  const toggleReadInArray = (book) => {
    book.isRead = !book.isRead;
  };

  const toggleReadInFirestore = async (book, userId) => {
    try {
      book.isRead = !book.isRead; // Toggle the read status
      await updateDoc(doc(db, 'users', userId, 'books', book.bookId), {
        isRead: book.isRead,
      });
      console.log('Book updated in Firestore:', book.bookId);
    } catch (error) {
      console.error('Error updating book in Firestore:', error);
      throw error;
    }
  };

  const getAllBooksFromFirestore = async (userId) => {
    try {
      const querySnapshot = await getDocs(
        collection(db, 'users', userId, 'books')
      );
      const books = [];
      querySnapshot.forEach((doc) => {
        const book = doc.data();
        book.bookId = doc.id;
        books.push(book);
      });
      return books;
    } catch (error) {
      console.error('Error getting books from Firestore:', error);
      throw error;
    }
  };

  return {
    addBookToArray,
    addBookToFirestore,
    deleteBookFromArray,
    deleteBookFromFirestore,
    toggleReadInArray,
    toggleReadInFirestore,
    getAllBooksFromFirestore,
    myLibrary,
  };
})();

// BookModule.getAllBooksFromFirestore('pcUcqnlPIRSfaPBI6ojatLdGwZ33');

// const testBookFunctionality = async (userId) => {
//   // Add a book to Firestore
//   const newBook = BookModule.addBookToArray(
//     'Book Title',
//     'Book Author',
//     200,
//     false
//   );
//   console.log('Adding book to Firestore...');
//   await BookModule.addBookToFirestore(newBook, userId);
//   console.log('Book added to Firestore.');

//   // Retrieve user's books from Firestore
//   console.log("Retrieving user's books from Firestore...");
//   await BookModule.getAllBooksFromFirestore(userId);
//   console.log('Books retrieved from Firestore.');

//   // Toggle read status in Firestore
//   console.log('Toggling read status in Firestore...');
//   await BookModule.toggleReadInFirestore(newBook, userId);
//   console.log('Read status toggled in Firestore.');

//   // Retrieve user's books from Firestore again
//   console.log("Retrieving user's books from Firestore...");
//   await BookModule.getAllBooksFromFirestore(userId);
//   console.log('Books retrieved from Firestore.');

//   // Delete book from Firestore
//   console.log('Deleting book from Firestore...');
//   await BookModule.deleteBookFromFirestore(newBook, userId);
//   console.log('Book deleted from Firestore.');

//   // Retrieve user's books from Firestore once more
//   console.log("Retrieving user's books from Firestore...");
//   await BookModule.getAllBooksFromFirestore(userId);
//   console.log('Books retrieved from Firestore.');
// };

// const userId = 'pcUcqnlPIRSfaPBI6ojatLdGwZ33';
// testBookFunctionality(userId);
