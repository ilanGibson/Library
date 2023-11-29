const myLibrary = [{title: "Catching Fire", author: "temp", pages: 100, read: false}, {title: "Diary of a Wimpy Kid", author: "temp", pages: 50, read: true}];
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

}

function listMyLibrary() {
    clearLibrary();
    myLibrary.forEach(function(book) {
        let newDiv = document.createElement("div");
        newDiv.innerHTML += `${book.title} by ${book.author} is ${book.pages} pages long. You ${have_or_havent(book.read)} read it.`;
        newDiv.classList = (book.title);
        library.appendChild(newDiv);
        library_div = library.querySelectorAll("div");
    });
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