const addBook = document.querySelector('.add-btn');
const modal = document.querySelector('.modal');

addBook.addEventListener('click', () => {
    modal.classList.add('active');
});

window.addEventListener('click', (event) => {
    if(event.target == modal){
        modal.classList.remove('active');
    }
})