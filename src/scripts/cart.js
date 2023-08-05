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
            <button id="delete-from-cart-btn" class="self-start ml-auto hover:bg-[#3c3c3c] p-1.5 rounded-lg">
                <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                >
                <g id="System-Line/delete-bin-6-line" clip-path="url(#clip0_2720_971)">
                    <g id="Group">
                    <path id="Vector"
                        d="M7 4V2H17V4H22V6H20V21C20 21.2652 19.8946 21.5196 19.7071 21.7071C19.5196 21.8946 19.2652 22 19 22H5C4.73478 22 4.48043 21.8946 4.29289 21.7071C4.10536 21.5196 4 21.2652 4 21V6H2V4H7ZM6 6V20H18V6H6ZM9 9H11V17H9V9ZM13 9H15V17H13V9Z"
                        fill="#FCF7E6"
                    />
                    </g>
                </g>
                <defs>
                    <clipPath id="clip0_2720_971">
                    <rect width="24" height="24" fill="white" />
                    </clipPath>
                </defs>
                </svg>
            </button>
            </div>`);
      });
      shoppingCartList.innerHTML = cartProduct;
      //   shoppingCartList.insertAdjacentHTML("beforeend", cartCard);
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
  }
});
window.onload = cartProducts.loadCartFromLocalStorage();
