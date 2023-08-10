const url = "https://voodoo-sandbox.myshopify.com/products.json?limit=24";
const cardsList = document.querySelector(".cards-list");
const prevBtn = document.getElementById("prev-btn");
const nextBtn = document.getElementById("next-btn");
class Products {
  constructor(products) {
    this.baseUrl = "https://voodoo-sandbox.myshopify.com/products.json";
    this.limit = 24;
    this.currentPage = 1;
    this.totalPages = 1;
  }

  //   fetch limited quantity of products
  async getProducts() {
    try {
      const response = await fetch(
        `${this.baseUrl}?limit=${this.limit}&page=${this.currentPage}`
      );
      const data = await response.json();
      this.products = data.products;
      this.totalPages = Math.ceil(461 / this.limit);
      this.renderProducts(this.products);

      console.log(this.totalPages);
    } catch {
      console.error("Error fetching data: ", error);
      return [];
    }
  }

  //   render products
  renderProducts(products) {
    products.forEach((product) => {
      const productCard = `<div class="w-[300px] relative">
        <span class="absolute top-3 left-3 uppercase text-white text-xs uppercase rounded bg-black p-2">
            used
        </span>
        <a href="#">
            <img
                class="h-[300px] object-contain text-end border border-black rounded"
                src="${product.images[0]?.src}"
                alt="product image"
            />
        </a>
        <div class="flex items-center justify-between py-3 text-sm">
            <div class="flex flex-col">
                <span class="font-bold">${product.title}</span>
                <span class="font-bold">${product.variants[0]?.price} KR.</span>
            </div>
            <div class="flex flex-col text-right">
                <span class="font-bold">Condition</span>
                <span class="font-normal">Slightly used</span>
            </div>
        </div>
        <button id=${product.id} class="add-to-cart-btn text-white text-sm uppercase rounded bg-black py-4 w-full">
            Add to cart
        </button>
      </div>`;
      cardsList.insertAdjacentHTML("beforeend", productCard);
    });
  }

  //  pagination
  async nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      return this.fetchData();
    } else {
      console.log("No more pages available.");
      return [];
    }
  }

  async prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      return this.fetchData();
    } else {
      console.log("You are on the first page.");
      return [];
    }
  }
}

const allProducts = new Products();
// render products
allProducts.getProducts();
// // add to cart
// document.addEventListener("click", (event) => {
//   if (event.target.classList.contains("add-to-cart-btn")) {
//     const productId = event.target.id;
//     allProducts.addToCart(productId);
//   }
// });
// window.onload = allProducts.loadCartFromLocalStorage();
// pagination
prevBtn.addEventListener("click", allProducts.prevPage);
nextBtn.addEventListener("click", allProducts.nextPage);
