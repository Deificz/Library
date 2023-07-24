//Modal Pop-up script
const openModal = document.querySelector(`.add-button`);
const closeModal = document.querySelector(`.close-button`);
const header = document.querySelector(`#header`);
const modal = document.querySelector(`.modal`);

openModal.addEventListener(`click`, () => {
    modal.show();
})
closeModal.addEventListener(`click`, () => {
    modal.close();
})

//Input script
let myLibrary = [];


function Book(title, author, pages, read){
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

function displayBook(){
    //Reset the input fields
        const list = document.querySelector(`.list`);
        document.getElementById(`title`).value = ``;
        document.getElementById(`author`).value = ``;
        document.getElementById(`pages`).value = ``;
        list.innerHTML = "";
       
    //Run through the array and display the books
    for(let i = 0; i < myLibrary.length; i++){
        let book = myLibrary[i];
        let card = document.createElement(`div`);
        card.classList.add('card');
        let inputTitle = document.createElement(`p`);
        let inputAuthor = document.createElement(`p`);
        let inputPages = document.createElement(`p`);
        let inputRead = document.createElement(`button`);
        inputRead.classList.add(`btnSwitch`);
        inputRead.classList.add(`${i}`);
        inputRead.setAttribute(`onclick`,`switchRead(${i})`);
        
        const btnRemove = document.createElement(`button`);
        btnRemove.classList.add(`remove`);
        btnRemove.classList.add(`fa-regular`);
        btnRemove.classList.add(`fa-trash-can`);
        btnRemove.setAttribute(`onclick`,`removeBook(${i})`);

        inputTitle.textContent = book.title;
        inputAuthor.textContent = book.author;
        inputPages.textContent = book.pages;
        inputRead.textContent = book.read;

        list.appendChild(card);
        card.appendChild(inputTitle);
        card.appendChild(inputAuthor);
        card.appendChild(inputPages);
        inputRead.textContent === `READ` ?
        inputRead.style.cssText = `background-color: rgb(240, 134, 134)`:
        inputRead.style.cssText = `background-color: greenyellow`;
        card.appendChild(inputRead);
        card.appendChild(btnRemove);

    }
}

function removeBook(book){
    myLibrary.splice(book, 1);
    displayBook();
}

function switchRead(book){
    let read = myLibrary[book].read;
   
    if(read === `DONE`)
        myLibrary[book].read = `READ`;
    
    else if(read === `READ`)
        myLibrary[book].read = `DONE`;

    displayBook();
    
}

function addBookToLibrary(){
    const titleInput = document.getElementById(`title`).value;
    const authorInput = document.getElementById(`author`).value;
    const pagesInput = document.getElementById(`pages`).value;
    const readInput = document.querySelector("input[type='radio'][name=read]:checked").value;

    let book = new Book(titleInput, authorInput,pagesInput,readInput);
    myLibrary.push(book);

    displayBook(titleInput, authorInput,pagesInput,readInput);
}

const form = document.querySelector(`.new-book`);

form.addEventListener(`submit`, (event) => {
    event.preventDefault();
    addBookToLibrary();
    modal.close();
});

