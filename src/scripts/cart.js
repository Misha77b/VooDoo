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
    this.total = 0;
    this.productQuantity = 1;
  }

  async getProducts() {
    try {
      const response = await fetch(`${this.url}`)
        .then((res) => res.json())
        .then((data) => data.products);
      this.products = response;

      console.log("cart-all products", this.products);
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
      //   console.log(this.cartQuantity, cartCounter);
      //   console.log("Product added to cart:", productToAdd);
      //   console.log("cart shopping", this.shoppingCart);
    } else {
      console.error("Product not found.");
    }
  }

  saveCartToLocalStorage() {
    localStorage.setItem("cart", JSON.stringify(this.cart));
  }

  async loadCartFromLocalStorage() {
    const response = await fetch(`${this.url}`)
      .then((res) => res.json())
      .then((data) => data.products);
    const cartData = localStorage.getItem("cart");
    this.cart = cartData ? JSON.parse(cartData) : [];
    this.cartQuantity = this.cart.length;
    cartCounter.innerText = this.cartQuantity;
    const cartFromLS = this.cart.map((id) => {
      return response.find((product) => product.id === Number(id));
    });
    console.log(cartFromLS);
    this.renderShoppingCart(cartFromLS);
  }

  removeFromCart(cartItemId) {
    this.cart = this.cart.filter((product) => {
      return product !== Number(cartItemId);
    });
    this.shoppingCart = this.shoppingCart.filter((product) => {
      return product.id !== Number(cartItemId);
    });
    this.saveCartToLocalStorage();
    this.renderShoppingCart(this.shoppingCart);
  }

  renderShoppingCart(shoppingCart) {
    if (shoppingCart.length === 0) {
      shoppingCartList.innerHTML = "<span>Cart is empty</span>";
    } else {
      let cartProduct = "";
      shoppingCart.map((product) => {
        return (cartProduct += `<div class="flex w-full">
            <img
                class="w-[74px] h-[74px] mr-[18px] border border-[#FCF7E6] rounded"
                src="${product?.images[0]?.src}"
                alt="product img"
            />
            <div class="flex flex-col justify-between text-xs font-bold">
                <span>${product.title}</span>
                <span>${product.variants[0].price}</span>
                <div class="flex gap-1">
                <button
                    onClick="changeQuantity(${this.productQuantity - 1})"
                  class="w-[20px] h-[20px] hover:bg-[#3c3c3c] rounded text-center text-sm font-bold decrement-btn"
                >
                  -
                </button>
                <span class="w-[20px] h-[20px] text-center text-sm font-bold quantity">${
                  this.productQuantity
                }</span>
                <button
                  onClick="changeQuantity(${this.productQuantity + 1})"
                  class="w-[20px] h-[20px] hover:bg-[#3c3c3c] rounded text-center text-sm font-bold increment-btn"
                >
                  +
                </button>
              </div>
            </div>
            <button class="self-start ml-auto hover:bg-[#3c3c3c] p-1.5 rounded-lg">
            <img 
              id=${product.id} 
              class="delete-from-cart" src="./images/delete-bin-6-line.png" alt="bin image" 
            />
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
  const productId = event.target.id;
  if (event.target.classList.contains("add-to-cart-btn")) {
    cartProducts.addToCart(productId);
    // console.log("Add to cart", productId);
  } else if (event.target.classList.contains("delete-from-cart")) {
    console.log(productId);
    console.log(cartProducts.removeFromCart(productId));
    cartProducts.removeFromCart(productId);
  }
});

cartProducts.loadCartFromLocalStorage();
cartProducts.renderShoppingCart();
