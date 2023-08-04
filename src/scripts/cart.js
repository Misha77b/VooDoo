const cart = document.getElementById("cart-btn");
const shoppingCartSidebar = document.getElementById("drawer-navigation");
const closeShoppingCart = document.getElementById("close-shopping-cart");
const cartCounter = document.getElementById("quantity");

cart.addEventListener("click", (e) => {
  shoppingCartSidebar.classList.toggle("translate-x-full");
});

closeShoppingCart.addEventListener("click", (e) => {
  shoppingCartSidebar.classList.toggle("translate-x-full");
});

class Cart {
  constructor(products) {
    this.url = "https://voodoo-sandbox.myshopify.com/products.json";
    this.products = products;
    this.cart = [];
    this.cartQuantity = 0;
  }

  async getProducts() {
    try {
      const response = await fetch(`${this.url}`);
      const data = await response.json();
      this.products = data.products;

      console.log("cart", this.products);
    } catch {
      console.error("Error fetching data: ", error);
      return [];
    }
  }

  //   Add to cart
  addToCart(productId) {
    const productToAdd = this.products.find((product) => {
      return product.id === Number(productId);
    });

    console.log(this.products, productToAdd);
    if (productToAdd) {
      this.cart.push(productToAdd.id);
      this.saveCartToLocalStorage();
      this.cartQuantity = this.cart.length;
      cartCounter.innerText = this.cartQuantity;
      console.log(this.cartQuantity, cartCounter);
      console.log("Product added to cart:", productToAdd);
    } else {
      console.error("Product not found.");
    }
  }

  saveCartToLocalStorage() {
    localStorage.setItem("cart", JSON.stringify(this.cart));
  }

  loadCartFromLocalStorage() {
    const cartData = localStorage.getItem("cart");
    this.cart = cartData ? JSON.parse(cartData) : [];
    this.cartQuantity = this.cart.length;
    cartCounter.innerText = this.cartQuantity;
  }
}

const cartProducts = new Cart();
cartProducts.getProducts();
// add to cart
document.addEventListener("click", (event) => {
  if (event.target.classList.contains("add-to-cart-btn")) {
    const productId = event.target.id;
    cartProducts.addToCart(productId);
  }
});
window.onload = cartProducts.loadCartFromLocalStorage();
