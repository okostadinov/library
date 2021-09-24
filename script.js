class Book{
    index = 0;

    constructor(title, author, pages, isRead) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.isRead = isRead;
    }

    set index(index) {
        this.index = index;
    }
};

/**
 * Update the isRead parameter of the given book,
 * update the Read button accordingly, and re-evaluate (not) read stats.
 * @param {*} e     event handler
 * @param {*} book  book to be updated
 */
function changeReadStatus(e, book) {
    book.isRead = !book.isRead;

    reverseReadDetails(book);

    e.target.classList.toggle('active');
    e.target.textContent = (book.isRead) ? 'Yes' : 'No';
}

const addBookToTable = (book) => {
    let newTableRow = tableBody.insertRow();
        
        for (const [key, value] of Object.entries(book)) {
            if (key === 'index') continue; // Do not shown indices

            let newCell = newTableRow.insertCell();

            if (key === 'isRead') {
                let btnIsRead = document.createElement('button');
                btnIsRead.classList.add('btn-is-read');
                btnIsRead.addEventListener('click', (e) => changeReadStatus(e, book));
                if (value) { btnIsRead.classList.toggle('active'); }
                btnIsRead.textContent = (value) ? 'Yes' : 'No';
                newCell.appendChild(btnIsRead);
                continue;
            }
            
            let textValue = document.createTextNode(value);
            newCell.appendChild(textValue);
        }

    /* Encapsulate function to scope of addBookToTable(),
     * since it is only necessary for this function. */
    (function addDeleteButton() {
        let btnDelete = document.createElement('button');
        btnDelete.textContent = 'X';
        btnDelete.classList.add('btn-delete');
        btnDelete.value = book.index;
        btnDelete.addEventListener('click', deleteBook);
        let deleteCell = newTableRow.insertCell();
        deleteCell.classList.add('delete-cell');
        deleteCell.appendChild(btnDelete);
    }());
}

const addBookToLibrary = () => {
    let title = inpBookTitle.value;
    let author = inpBookAuthor.value;
    let pages = inpBookPages.value;
    let isRead = inpBookIsRead.checked;
    
    let book = new Book(title, author, pages, isRead);
    myLibrary.push(book);
    book.index = myLibrary.indexOf(book);

    addBookToStorage(book);
    addBookToTable(book);
    addReadDetails(book);

    (function clearInputFlds() {
        inpBookTitle.value = '';
        inpBookAuthor.value = '';
        inpBookPages.value = '';
        deactivateAddBtn();
    }());
};

/**
 * Retrieves the user's books from localStorage
 * and re-inserts them into the books array and table.
 * @returns 
 */
function updateTable() {
    if (window.localStorage.length === 0) { return; }

    Object.keys(localStorage).forEach(id => {
        let strBook = localStorage.getItem(id);
        let newBook = JSON.parse(strBook);
        myLibrary.push(newBook);
        addBookToTable(newBook);
    })
}

/**
 * Forbids the user from adding a book without entering the required details.
 */
function deactivateAddBtn() {
    let title = inpBookTitle.value;
    let author = inpBookAuthor.value;
    let pages = inpBookPages.value;

    btnAddBook.disabled = (title === '' 
        || author === '' 
        || pages === '') 
        ? true : false;
};

const deleteBook = (e) => {
    let row = e.target.parentNode.parentNode;
    row.parentNode.removeChild(row);

    let book = myLibrary.find(book => book.index == e.target.value);
    myLibrary.splice(myLibrary.indexOf(book), 1);
    removeReadDetails(book);
    removeBookFromStorage(book);
}

const addBookToStorage = (book) => {
    let strBook = JSON.stringify(book);
    window.localStorage.setItem(book.index, strBook);
}

const removeBookFromStorage = (book) => {
    window.localStorage.removeItem(book.index);
}

const addReadDetails = (book) => {
    if (book.isRead) {
        read++;
    } else {
        notRead++;
    }
    readAmount.textContent = read;
    notReadAmount.textContent = notRead;
}

const removeReadDetails = (book) => {
    if (book.isRead) {
        read--;
    } else {
        notRead--;
    }
    readAmount.textContent = read;
    notReadAmount.textContent = notRead;
}

/**
 * Updates the storage by deleting the book
 * with the outdated isRead attribute,
 * and re-inserts it with the updated one.
 * @param {*} book  book to be updated
 */
const reverseReadDetails = (book) => {
    if (book.isRead) {
        read++;
        notRead--;
    } else {
        read--;
        notRead++;
    }
    readAmount.textContent = read;
    notReadAmount.textContent = notRead;

    removeBookFromStorage(book);
    addBookToStorage(book);
}

/* Main */
let myLibrary = [];
let read = 0;
let notRead = 0;

const container = document.querySelector('#container');

const title = document.createElement('h1');
title.textContent = 'My Library';
container.appendChild(title);

/* Add Book form */
const formContainer = document.createElement('div');
formContainer.setAttribute('id', 'formContainer');

const lblBookTitle = document.createElement('label');
lblBookTitle.setAttribute('for', 'bookTitle');
lblBookTitle.textContent = 'Name:';
formContainer.appendChild(lblBookTitle);

const inpBookTitle = document.createElement('input');
inpBookTitle.setAttribute('type', 'text');
inpBookTitle.classList.add('fld-input');
inpBookTitle.setAttribute('id', 'bookTitle');
formContainer.appendChild(inpBookTitle);

const lblBookAuthor = document.createElement('label');
lblBookAuthor.setAttribute('for', 'bookAuthor');
lblBookAuthor.textContent = 'Author:';
formContainer.appendChild(lblBookAuthor);

const inpBookAuthor = document.createElement('input');
inpBookAuthor.setAttribute('type', 'text');
inpBookAuthor.classList.add('fld-input');
inpBookAuthor.setAttribute('id', 'bookAuthor');
formContainer.appendChild(inpBookAuthor);

const lblBookPages = document.createElement('label');
lblBookPages.setAttribute('for', 'bookPages');
lblBookPages.textContent = 'Pages:';
formContainer.appendChild(lblBookPages);

const inpBookPages = document.createElement('input');
inpBookPages.setAttribute('type', 'number');
inpBookPages.classList.add('fld-input');
inpBookPages.setAttribute('id', 'bookPages');
formContainer.appendChild(inpBookPages);

const lblBookIsRead = document.createElement('label');
lblBookIsRead.setAttribute('for', 'bookIsRead');
lblBookIsRead.textContent = 'Read:';
formContainer.appendChild(lblBookIsRead);

const inpBookIsRead = document.createElement('input');
inpBookIsRead.setAttribute('type', 'checkbox');
inpBookIsRead.classList.add('fld-input');
inpBookIsRead.setAttribute('id', 'bookIsRead');
formContainer.appendChild(inpBookIsRead);

const btnAddBook = document.createElement('button');
btnAddBook.setAttribute('id', 'btnAddBook');
btnAddBook.textContent = 'Add Book';
btnAddBook.addEventListener('click', addBookToLibrary);
formContainer.appendChild(btnAddBook);

container.appendChild(formContainer);

const fldsInput = document.querySelectorAll('.fld-input');
fldsInput.forEach(fld => {fld.addEventListener('input', deactivateAddBtn)});

/* Add reading details */
const detailsContainer = document.createElement('div');
detailsContainer.setAttribute('id', 'detailsContainer');

const lblReadAmount = document.createElement('label');
lblReadAmount.textContent = 'Read Books:';
detailsContainer.appendChild(lblReadAmount);

const readAmount = document.createElement('div');
readAmount.classList.add('details');
readAmount.textContent = read;
detailsContainer.appendChild(readAmount);

const lblNotReadAmount = document.createElement('label');
lblNotReadAmount.setAttribute('for', 'NotReadAmount');
lblNotReadAmount.textContent = 'To Be Read:';
detailsContainer.appendChild(lblNotReadAmount);

const notReadAmount = document.createElement('div');
notReadAmount.classList.add('details');
notReadAmount.textContent = notRead;
detailsContainer.appendChild(notReadAmount);

container.appendChild(detailsContainer);

/* Add Library Table */
const libTable = document.createElement('table');
libTable.setAttribute('id', 'library');
const tableHead = document.createElement('thead');
const tableBody = document.createElement('tbody');

const trHead = document.createElement('tr');
const thTitle = document.createElement('th');
thTitle.textContent = 'Title';
const thAuthor = document.createElement('th');
thAuthor.textContent = 'Author';
const thPages = document.createElement('th');
thPages.textContent = 'Pages';
const thIsRead = document.createElement('th');
thIsRead.textContent = 'Read';
const thDelete = document.createElement('th');

trHead.appendChild(thTitle);
trHead.appendChild(thAuthor);
trHead.appendChild(thPages);
trHead.appendChild(thIsRead);
trHead.appendChild(thDelete);
tableHead.appendChild(trHead);
libTable.appendChild(tableHead);
libTable.appendChild(tableBody);

container.appendChild(libTable);


deactivateAddBtn();
updateTable();
myLibrary.forEach(book => addReadDetails(book));