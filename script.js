window.addEventListener('load', function() {
    View.displayBook();
});

const View = (() => {
    const displayBook = () => {
        //Reset the input fields
        const list = document.querySelector(`.list`);
        document.getElementById(`title`).value = ``;
        document.getElementById(`author`).value = ``;
        document.getElementById(`pages`).value = ``;
        list.innerHTML = "";
       
        //Run through the array and display the books
        for(let i = 0; i < Model.myLibrary.length; i++){
            let book = Model.myLibrary[i];
            let card = document.createElement(`div`);
            card.classList.add('card');
            let inputTitle = document.createElement(`p`);
            let inputAuthor = document.createElement(`p`);
            let inputPages = document.createElement(`p`);
            let inputRead = document.createElement(`button`);
            inputRead.classList.add(`switch${i}`);
            inputRead.classList.add(`btnSwitch`);
            
            
            const btnRemove = document.createElement(`button`);
            btnRemove.classList.add(`fa-regular`);
            btnRemove.classList.add(`fa-trash-can`);
            btnRemove.classList.add(`remove${i}`);
            btnRemove.classList.add(`btnRemove`);

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

            document.querySelector(`.switch${i}`).addEventListener(`click`,()=>{
                Model.switchRead(i);
                Model.saveLibrary();
            });
            document.querySelector(`.remove${i}`).addEventListener(`click`,()=>{
                Model.removeBook(i);
                Model.saveLibrary();
            });
        }
    }

    return {
        displayBook,
    }
})();

const Model = (() => {
    let myLibrary;

    //Check if the library exists in local storage
    if(`myLibrary` in localStorage){
        const storedLibraryJSON = localStorage.getItem('myLibrary');
        const storedLibrary = JSON.parse(storedLibraryJSON);
        myLibrary = storedLibrary;
    }
    else{
        myLibrary = [];
    }

    function Book(title, author, pages, read){
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read;
    }

    //Push the book ot the library
    const addBook = () => {
        const titleInput = document.getElementById(`title`).value;
        const authorInput = document.getElementById(`author`).value;
        const pagesInput = document.getElementById(`pages`).value;
        const readInput = document.querySelector("input[type='radio'][name=read]:checked").value;

        let book = new Book(titleInput, authorInput,pagesInput,readInput);
        myLibrary.push(book);

        View.displayBook();
    }
    

    const removeBook = (book) => {
        myLibrary.splice(book, 1);
        View.displayBook();
        saveLibrary();
    }

    const switchRead = (book) => {
        let read = myLibrary[book].read;
       
        if(read === `DONE`)
            myLibrary[book].read = `READ`;
        
        else if(read === `READ`)
            myLibrary[book].read = `DONE`;
    
        View.displayBook();
    }
    
    const saveLibrary = () => {
        const jsonString = JSON.stringify(myLibrary);
        localStorage.setItem('myLibrary', jsonString);
    }

    return{
        addBook,
        removeBook,
        switchRead,
        saveLibrary,
        myLibrary,
    }

})();

const Controller = (() => {
    const form = document.querySelector(`.new-book`);
    const openModal = document.querySelector(`.add-button`);
    const closeModal = document.querySelector(`.close-button`);
    const modal = document.querySelector(`.modal`);

    //handle Submit
    form.addEventListener(`submit`, (event) => {
        event.preventDefault();
        Model.addBook();
        Model.saveLibrary();
        modal.close();
    });

    //handle Modal pop-ups
    openModal.addEventListener(`click`, () => {
        modal.show();
    })
    closeModal.addEventListener(`click`, () => {
        modal.close();
    })
    
})();