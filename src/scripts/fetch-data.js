const url = "https://voodoo-sandbox.myshopify.com/products.json?limit=24";
const cardsList = document.querySelector(".cards-list");

class Products {
  constructor(products) {
    this.products = products;
  }

  async getProducts() {
    this.products = await fetch(url)
      .then((response) => response.json())
      .then((data) => data.products);
    console.log("products", this.products);
    this.renderProducts(this.products);
  }

  renderProducts(products) {
    products.forEach((product) => {
      const productCard = `<div class="w-[300px] relative">
        <span class="absolute top-3 left-3 uppercase text-white text-xs uppercase rounded bg-black p-2">
            used
        </span>
        <a href="#">
            <img
                class="h-[300px] object-cover text-end border border-black rounded"
                src="${product.images[0]?.src}"
                alt="product image"
            />
        </a>
        <div class="flex items-center justify-between py-3 text-sm">
            <div class="flex flex-col">
                <span class="font-bold">${product.title}</span>
                <span class="font-bold">${product.variants[0].price} KR.</span>
            </div>
            <div class="flex flex-col text-right">
                <span class="font-bold">Condition</span>
                <span class="font-normal">Slightly used</span>
            </div>
        </div>
        <button class="text-white text-sm uppercase rounded bg-black py-4 w-full">
            Add to cart
        </button>
      </div>`;
      cardsList.insertAdjacentHTML("beforeend", productCard);
    });
  }
}

const allProducts = new Products();
allProducts.getProducts();
