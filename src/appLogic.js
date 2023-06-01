// TO DO:
// 1. Get firebase to work
// 2. Fix sign in
// 3. Change back to class syntax

import { db, collection, addDoc, deleteDoc, doc } from './firebase.js';

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

  const addBookToFirestore = async (newBook) => {
    try {
      const docRef = await addDoc(collection(db, 'books'), {
        title: newBook.title,
        author: newBook.author,
        pages: newBook.pages,
        isRead: newBook.isRead,
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
        item.isRead === book.isRead
    );
    if (index > -1) {
      myLibrary.splice(index, 1);
    }
  };

  const deleteBookFromFirestore = async (book) => {
    try {
      await deleteDoc(doc(db, 'books', book.bookId));
      console.log('Book deleted from Firestore:', book.bookId);
    } catch (error) {
      console.error('Error deleting book from Firestore:', error);
      throw error;
    }
  };

  const toggleIsRead = (book) => {
    book.isRead = !book.isRead;
  };

  return {
    addBookToArray,
    addBookToFirestore,
    deleteBookFromArray,
    deleteBookFromFirestore,
    toggleIsRead,
    myLibrary,
  };
})();

const book = BookModule.addBookToArray('Book 1', 'Author 1', 100, false);
try {
  const bookId = await BookModule.addBookToFirestore(book);
  console.log('Book ID:', bookId);
  BookModule.deleteBookFromArray(book); // Delete from local array
  await BookModule.deleteBookFromFirestore(book); // Delete from Firestore
} catch (error) {
  console.error('Error adding/deleting book:', error);
}
