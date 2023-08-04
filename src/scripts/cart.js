const cart = document.getElementById("cart-btn");
const shoppingCartSidebar = document.getElementById("drawer-navigation");
const closeShoppingCart = document.getElementById("close-shopping-cart");

cart.addEventListener("click", (e) => {
  shoppingCartSidebar.classList.toggle("translate-x-full");
});

closeShoppingCart.addEventListener("click", (e) => {
  shoppingCartSidebar.classList.toggle("translate-x-full");
});
