const cart = document.getElementById("cart-btn");
const shoppingCartList = document.getElementById("shopping-cart-list");
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
    this.shoppingCart = [];
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
      this.shoppingCart.push(productToAdd);
      this.renderShoppingCart(this.shoppingCart);
      //   logs to console
      console.log(this.cartQuantity, cartCounter);
      console.log("Product added to cart:", productToAdd);
      console.log("cart shopping", this.shoppingCart);
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

  renderShoppingCart(shoppingCart) {
    if (shoppingCart.length === 0) {
      shoppingCartList.innerHTML = "Cart is empty";
    } else {
      let cartProduct = "";
      shoppingCart.map((product) => {
        return (cartProduct += `<div class="flex w-full">
            <img
                class="w-[74px] h-[74px] mr-[18px] border border-[#FCF7E6] rounded"
                src="${product.images[0]?.src}"
                alt="product img"
            />
            <div class="flex flex-col justify-between text-xs font-bold">
                <span>${product.title}</span>
                <span>${product.variants[0].price}</span>
                <span>- 1 +</span>
            </div>
            <button class="self-start ml-auto hover:bg-[#3c3c3c] p-1.5 rounded-lg">
            <img id=${product.id} class="delete-from-cart" src="./images/delete-bin-6-line.png" alt="bin image" />
            </button>
            </div>`);
      });
      shoppingCartList.innerHTML = cartProduct;
    }
  }
}

const cartProducts = new Cart();
cartProducts.getProducts();
// add to cart
document.addEventListener("click", (event) => {
  if (event.target.classList.contains("add-to-cart-btn")) {
    const productId = event.target.id;
    cartProducts.addToCart(productId);
    console.log("Add to cart", productId);
  } else if (event.target.classList.contains("delete-from-cart")) {
    const productId = event.target.id;
    console.log("Remove from cart", productId);
  }
});
window.onload = cartProducts.loadCartFromLocalStorage();
