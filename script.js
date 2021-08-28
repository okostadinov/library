function Book(title, author, pages, isRead) {
    this.index = 0;
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.isRead = (isRead === true) ? 'Read' : 'Not read';
}

const addBookToLibrary = () => {
    let title = inpBookTitle.value;
    let author = inpBookAuthor.value;
    let pages = inpBookPages.value;
    let isRead = inpBookIsRead.checked;
    
    let newBook = new Book(title, author, pages, isRead);
    myLibrary.push(newBook);
    newBook.index = myLibrary.indexOf(newBook);

    let newTableRow = libTable.insertRow();
    
    for (const [key, value] of Object.entries(newBook)) {
        if (key === 'index') continue;
        let newCell = newTableRow.insertCell();
        let textValue = document.createTextNode(value);
        newCell.appendChild(textValue);
    }

    (function addDeleteButton(book, row) {
        let btnDelete = document.createElement('button');
        btnDelete.textContent = 'X';
        btnDelete.classList.add('btn-delete');
        btnDelete.value = newBook.index;
        console.log(myLibrary.length);
        btnDelete.addEventListener('click', deleteBook);
        let deleteCell = newTableRow.insertCell();
        deleteCell.appendChild(btnDelete);
    }());

    (function clearInputFlds() {
        inpBookTitle.value = '';
        inpBookAuthor.value = '';
        inpBookPages.value = '';
        deactivateAddBtn();
    }());

    //addDeleteButton(newBook, newTableRow);
    //clearInputFlds();
};

const deleteBook = (e) => {
    let row = e.target.parentNode.parentNode;
    row.parentNode.removeChild(row);
    myLibrary.splice(e.target.value, 1);
    console.log(myLibrary.length);
}

// const clearInputFlds = () => {
//     inpBookTitle.value = '';
//     inpBookAuthor.value = '';
//     inpBookPages.value = '';
//     deactivateAddBtn();
// };

const deactivateAddBtn = () => {
    let title = inpBookTitle.value;
    let author = inpBookAuthor.value;
    let pages = inpBookPages.value;

    (title === '' || author === '' || pages === '') ? 
        btnAddBook.disabled = true : btnAddBook.disabled = false;

};

let myLibrary = [];
const container = document.querySelector('#container');

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
