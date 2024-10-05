class Book {
  constructor(Title, Author, Page, Status) {
    this.Title = Title;
    this.Author = Author;
    this.Page = Page;
    this.Status = Status;
  }

  toggle() {
    this.Status = !this.Status;
  }
}

const myLibrary = [];

function addBookToLibrary(Title, Author, Page, Status) {
  let add = new Book(Title, Author, Page, Status);
  myLibrary.push(add);
}

function addEventListeners() {
  const btns1 = document.querySelectorAll("#change");

  btns1.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const ele = e.target;
      const card = ele.parentNode;
      const index = Number(ele.parentNode.getAttribute("index"));
      myLibrary[index].toggle();
      disp();
    });
  });

  const btns2 = document.querySelectorAll("#delete");

  btns2.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const ele = e.target;
      const card = ele.parentNode;
      const index = Number(ele.parentNode.getAttribute("index"));
      myLibrary.splice(index, 1);
      disp();
    });
  });
}

function disp() {
  const container = document.querySelector(".container");
  container.innerHTML = '';
  for (let book of myLibrary) {
    const container = document.querySelector(".container");
    const div = document.createElement("div");
    div.setAttribute("index", `${myLibrary.indexOf(book)}`);
    div.classList.add("book-card");
    const div1 = document.createElement("div");
    div1.classList.add("book-title");
    div1.textContent = `Title: ${book.Title}`
    const div2 = document.createElement("div");
    div2.classList.add("book-author");
    div2.textContent = `Author: ${book.Author}`;
    const div3 = document.createElement("div");
    div3.classList.add("book-page");
    div3.textContent = `Page: ${book.Page}`;
    const div4 = document.createElement("div");
    div4.classList.add("book-status");
    div4.textContent = `Status(Have read?): ${book.Status}`;
    div.appendChild(div1);
    div.appendChild(div2);
    div.appendChild(div3);
    div.appendChild(div4);
    const btn1 = document.createElement("button");
    btn1.setAttribute("id", "change");
    btn1.textContent = "Change Status";
    div.appendChild(btn1);
    const btn2 = document.createElement("button");
    btn2.setAttribute("id", "delete");
    btn2.textContent = "Delete";
    div.appendChild(btn2);
    container.appendChild(div);
  }

  addEventListeners();
}

const btn = document.querySelector("#add");
const dialog = document.querySelector("#addBookDialog");
const cancelButton = document.querySelector("#cancel");
const confirmButton = document.querySelector("#confirm");

btn.addEventListener("click", () => {
  dialog.showModal();
});

cancelButton.addEventListener("click", () => {
  dialog.close();
});

confirmButton.addEventListener("click", (e) => {
  e.preventDefault();

  const title = document.querySelector("#title").value;
  const author = document.querySelector("#author").value;
  const page = document.querySelector("#page").value;
  const status = document.querySelector("#status").checked;

  addBookToLibrary(title, author, page, status);

  disp();

  dialog.close();
});


addBookToLibrary("To Kill a Mockingbird", "Harper Lee", 281, true);
addBookToLibrary("1984", "George Orwell", 328, false);
addBookToLibrary("The Great Gatsby", "F. Scott Fitzgerald", 180, true);
addBookToLibrary("Moby Dick", "Herman Melville", 720, false);
addBookToLibrary("War and Peace", "Leo Tolstoy", 1225, true);
addBookToLibrary("Pride and Prejudice", "Jane Austen", 279, false);


disp();



