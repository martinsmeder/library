console.log('app-logic.js says: this seem to be working');

import {
  db,
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  updateDoc,
  doc,
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
      return newBook.bookId;
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
