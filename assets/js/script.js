const fetchLibrary = () => {
  fetch("https://striveschool-api.herokuapp.com/books")
    .then((response) => {
      console.log(response);

      if (response.ok) {
        return response.json();
      } else {
        throw new Error("Something went wrong");
      }
    })
    .then((bookData) => {
      const row = document.getElementById("bookList");
      row.classList.add(
        "row",
        "row-cols-sm-2",
        "row-cols-md-3",
        "row-cols-lg-4",
        "g-4"
      );

      bookData.forEach((book) => {
        const col = document.createElement("div");
        col.classList.add("col");
        const card = document.createElement("div");
        card.classList.add("card", "h-100");
        card.innerHTML = `
        <img src="${book.img}" class="card-img-top img-fluid" alt="book img">
        <div class="card-body d-flex flex-column">
          <h5 class="card-title">${book.title} <span> €${book.price}</span></h5>
          <p class="card-text">Category: ${book.category}</p>
          <div class="mt-auto">
          <button class="btn btn-danger">Scarta</button >
          <button class="btn btn-success">Compra ora</button >
          </div>
  
        </div>
        `;
        col.appendChild(card);
        row.appendChild(col);

        const btnDelete = card.querySelector(".btn-danger");

        btnDelete.addEventListener("click", (event) => {
          const cardToRemove = event.target.closest(".col");
          if (cardToRemove) {
            cardToRemove.remove();
          }
        });

        const btnBuy = card.querySelector(".btn-success");

        btnBuy.addEventListener("click", () => {
          addToCart(book);
        });
      });
    })
    .catch((error) => {
      console.log(error);
    });
};

window.addEventListener("DOMContentLoaded", () => {
  fetchLibrary();
});
