let myLibrary = [{title: "Catching Fire", author: "temp", pages: 100, read: false}, {title: "Diary of a Wimpy Kid", author: "temp", pages: 50, read: true}];
let library = document.getElementById("library");
let library_div = library.querySelectorAll("div");
let show_lib = document.getElementById("show_lib_button");
let add_book = document.getElementById("add_book");
let dialog = document.getElementById("dialog");
let close_dialog = document.getElementById("close");
let submit = document.getElementById("submit");
show_lib.addEventListener("click", listMyLibrary);
add_book.addEventListener("click", function() {
    dialog.showModal();
});

close_dialog.addEventListener("click", resetDialog);
submit.addEventListener("click", addBookToLibrary, false);

function resetDialog() {
    let inputs = dialog.querySelectorAll(".user_input");
    let pages = document.getElementById("pages");
    inputs.forEach(function(input) {
        input.value = " ";
    });
    pages.value = 1;
    dialog.close();
}
function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read
}

function addBookToLibrary(event) {
    event.preventDefault();
    let title = document.getElementById("title");
    let author = document.getElementById("author");
    let pages = document.getElementById("pages");
    let read = document.getElementById("read");

    let temp_book = new Book(title.value, author.value, pages.value, read.value);
    myLibrary.push(temp_book);
    resetDialog();
    listMyLibrary();

}

function listMyLibrary() {
    clearLibrary();
    myLibrary.forEach(function(book) {
        let newDiv = document.createElement("div");
        newDiv.innerHTML += `${book.title} by ${book.author} is ${book.pages} pages long. You ${have_or_havent(book.read)} read it.`;
        newDiv.classList = (book.title);
        let deleteBookButton = addDeleteBookButton(book.title);
        newDiv.appendChild(deleteBookButton);
        let changeReadButton = addChangeReadButton(book.title);
        newDiv.appendChild(changeReadButton);
        library.appendChild(newDiv);
        library_div = library.querySelectorAll("div");
    });
}

function addDeleteBookButton(title) {
    let deleteBookButton = document.createElement("button");
    deleteBookButton.innerHTML = ("Delete Book");
    deleteBookButton.classList = (title);
    deleteBookButton.addEventListener("click", function() {
        popBook(title);
    });
    return (deleteBookButton);
}

function popBook(title) {
    myLibrary = myLibrary.filter(book => book.title !== title);
    console.log(title);
    clearLibrary();
}

function addChangeReadButton(title) {
    let changeReadButton = document.createElement("button");
    changeReadButton.innerHTML = ("Change read status");
    changeReadButton.classList = (title);
    changeReadButton.addEventListener("click", function() {
        changeReadStatus(title);
    });
    return (changeReadButton);
}

function changeReadStatus(title) {
    let bookToChange = myLibrary.findIndex(item => item.title === title);
    let currentStatus = myLibrary[bookToChange].read;
    myLibrary[bookToChange].read = !currentStatus;
    listMyLibrary();
}

function clearLibrary() {
    library_div.forEach(function(div) {
        div.remove();
    })
}

function have_or_havent(flag) {
    if (flag) {
        return "have"
    } else
        return "have not"
}