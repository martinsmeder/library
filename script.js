const myLibrary = [];

// Constructor function
function Book(title, author, pages, isRead) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.isRead = isRead;
  this.info = () => `${title} by ${author}, ${pages}, ${isRead}`;
}

// Create new instances of the Book object using it's constructor function
const theHobbit = new Book(
  'The Hobbit',
  'J.R.R. Tolkien',
  '295 pages',
  'not read yet'
);

const theEnchiridion = new Book(
  'The Enchiridion',
  'Epictetus',
  '28 pages',
  'is read'
);

const thePrince = new Book(
  'The Prince',
  'Niccolo Machiavelli',
  '144 pages',
  'not read yet'
);

console.log(theHobbit.info(), theEnchiridion.info(), thePrince.info());

function addBookToLibrary() {
  myLibrary.push(theHobbit, theEnchiridion, thePrince);
}

addBookToLibrary();

console.log(myLibrary);
