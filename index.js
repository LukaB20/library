const addBook = document.querySelector('.add-btn');
const modal = document.querySelector('.modal');
const submitBook = document.querySelector('.submit-btn');
const booksDiv = document.querySelector('.books');
const removeBook = document.querySelectorAll('.remove-book');
const toggleButton = document.querySelector('.toggle-read');

let books = [];

/* function Book(title, author, pages, isRead){
    this.id = Math.floor(Math.random() * 100);
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.isRead = isRead;
} */

class Book{
    constructor(title, author, pages, isRead){
        this.id = Math.floor(Math.random() + 100);
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.isRead = isRead;
    }
}

function updateUi(){
    booksDiv.innerHTML = '';
    books.forEach((book) => {
        let bookDiv = document.createElement('div');
        let bookTitle = document.createElement('p');
        let bookAuthor = document.createElement('p');
        let bookPages =  document.createElement('p');
        let bookRead = document.createElement('p');
        let toggleBtn = document.createElement('button');
        let removeBtn = document.createElement('button');
        removeBtn.classList.add('remove-book');
        removeBtn.innerText = 'Remove';
        removeBtn.addEventListener('click', () => {
            books = books.filter((b) => b.id !== book.id);
            updateUi();
        });
        toggleBtn.addEventListener('click', () => {
            books.forEach((b) => {
                if(b.id == book.id)
                    b.isRead = !book.isRead;
            })
            updateUi();
        })

        bookTitle.innerText = `Title: ${book.title}`;
        bookAuthor.innerText = `Author: ${book.author}`;
        bookPages.innerText = `Pages: ${book.pages}`;
        bookRead.innerText = `${book.isRead ? 'Read' : 'Not read'}`;
        if(!book.isRead){
            toggleBtn.classList.add('toggle-read');
            toggleBtn.innerText = 'Read';
        }else{
            toggleBtn.classList.add('toggle-read');
            toggleBtn.classList.add('not-read');
            toggleBtn.innerText = 'Not read';
        }

        bookDiv.classList.add('book');
        bookDiv.attributes.attribute = book.id;
        bookDiv.appendChild(bookTitle);
        bookDiv.appendChild(bookAuthor);
        bookDiv.appendChild(bookPages);
        bookDiv.appendChild(bookRead);
        bookDiv.appendChild(toggleBtn);
        bookDiv.appendChild(removeBtn);
        booksDiv.appendChild(bookDiv);
    })
}

addBook.addEventListener('click', () => {
    modal.classList.add('active');
});

window.addEventListener('click', (event) => {
    if(event.target == modal){
        modal.classList.remove('active');
    }
})

submitBook.addEventListener('click', () => {
    let bookTitle = document.querySelector('#book-title').value;
    let bookAuthor = document.querySelector('#book-author').value;
    let bookPages = document.querySelector('#book-pages').value;
    let checked = document.querySelector('#book-read').checked;
    let errorTitle = document.querySelector('.error-title');
    let errorAuthor = document.querySelector('.error-author');
    let errorPages = document.querySelector('.error-pages');

    errorAuthor.classList.remove('active');
    errorTitle.classList.remove('active');
    errorPages.classList.remove('active');

    if(bookTitle === ''){
        errorTitle.classList.add('active');
        return;
    }
    if(bookAuthor === ''){
        errorAuthor.classList.add('active');
        return;
    }
    if(bookPages === '' || bookPages === '0'){
        errorPages.classList.add('active');
        return;
    }

    let newBook = new Book(bookTitle, bookAuthor, bookPages, checked);
    books.push(newBook);
    modal.classList.remove('active');
    document.querySelector('#book-title').value = '';
    document.querySelector('#book-author').value = '';
    bookPages = document.querySelector('#book-pages').value = '';
    document.querySelector('#book-read').checked = false;
    updateUi();
});

