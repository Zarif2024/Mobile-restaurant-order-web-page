"use strict";
"use strict";
const overlay = document.querySelector(".overlay");
const form = document.querySelector(".form");
const openForm = document.querySelector(".open");
const submit = document.querySelector(".submit");
const hideAll = document.querySelector(".container");
const hidePrice = document.querySelector(".totalPrice");
const price = document.querySelector(".orders");
const hiddenOrder = document.querySelector(".hidden-order");
const closeModalBtn = document.querySelector(".btn--close-modal");

openForm.addEventListener("click", function () {
  overlay.classList.remove("hidden");
  hidePrice.classList.add("hidden");
  price.classList.add("hidden");
  form.classList.remove("hidden");
});

const close = document.querySelector(".btn--close-modal ");
close.addEventListener("click", function () {
  form.classList.add("hidden");
  overlay.classList.add("hidden");
  resetOrder(); // Clear all data and reset functionality
});

document
  .querySelector(".order_button")
  .addEventListener("click", function (event) {
    event.preventDefault();
    var nameField = document.querySelector(
      'input[placeholder="Enter your name"]'
    );
    var name = nameField.value;
    if (name) {
      alert("Payment made by " + name);

      nameField.value = "";
      document.querySelector(
        'input[placeholder="Enter your card number "]'
      ).value = "";
      document.querySelector('input[placeholder="Enter your CVV"]').value = "";
    }
  });

let totalPrice = 0;

function addToOrder(productName, productPrice) {
  let newProduct = document.createElement("div");
  newProduct.innerHTML = `
      <div class="product-item">
        <h2>${productName}</h2>
        <h3 class="product-price">$${productPrice}</h3>
      </div>
      <p onclick="removeFromOrder('${productName}', ${productPrice})">remove</p>
    `;

  document.querySelector(".orders .product").appendChild(newProduct);

  totalPrice += productPrice;
  document.querySelector(".total-price").innerText = `$${totalPrice}`;
  hidePrice.classList.remove("hidden");
  price.classList.remove("hidden");
  hiddenOrder.style.display = "block";
}

function removeFromOrder(productName, productPrice) {
  let product = Array.from(
    document.querySelectorAll(".orders .product h2")
  ).find((h2) => h2.innerText === productName).parentElement.parentElement;

  product.remove();

  totalPrice -= productPrice;
  document.querySelector(".total-price").innerText = `$${totalPrice}`;

  // Check if there are no items left in the order
  if (totalPrice === 0) {
    hidePrice.classList.add("hidden");
    price.classList.add("hidden");
    hiddenOrder.style.display = "none";
  }
}

function resetOrder() {
  // Clear all data and reset functionality
  totalPrice = 0;
  document.querySelector(".orders .product").innerHTML = ""; // Clear order items
  document.querySelector(".total-price").innerText = "$0"; // Reset total price
  hidePrice.classList.add("hidden"); // Hide total price
  price.classList.add("hidden"); // Hide price display
  hiddenOrder.style.display = "none"; // Hide order section
}

Array.from(document.querySelectorAll(".icon a")).forEach((a) => {
  a.onclick = function (event) {
    event.preventDefault();

    let productName =
      this.parentElement.previousElementSibling.querySelector(
        ".about h2"
      ).innerText;
    let productPrice = Number(
      this.parentElement.previousElementSibling
        .querySelector(".about h3")
        .innerText.slice(1)
    );

    addToOrder(productName, productPrice);

    return false;
  };
});
