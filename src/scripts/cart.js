const cart = document.getElementById("cart-icon");
const shoppingCartSidebar = document.getElementById("drawer-navigation");
const closeShoppingCart = document.getElementById("close-shopping-cart");

cart.addEventListener("click", (e) => {
  shoppingCartSidebar.classList.remove("translate-x-full");
});

closeShoppingCart.addEventListener("click", (e) => {
  shoppingCartSidebar.classList.add("translate-x-full");
});
