const url = `https://course-api.com/javascript-store-products`;
const container = document.querySelector(".products-container");
const btn = document.querySelectorAll(".company-btn");
let data;

document.addEventListener("DOMContentLoaded", async () => {
  const response = await fetch(url);
  data = await response.json();

  console.log("data:",data);
  displayProducts(data);
});

btn.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    const company = e.currentTarget.innerHTML;
    const filterData = productsFilter(company);
    displayProducts(filterData);
  });
});

const displayProducts = (products) => {
  const displayData = products
    .map((product) => {
      const { name, price, image } = product.fields;
      return `
        <div class="single-product">
              <img
                src="${image[0].url}"
                class="single-product-img img"
                alt="${name}"
              />
              <footer>
                <h5 class="name">${name}</h5>
                <span class="price">$${price}</span>
              </footer>
            </div>
    `;
    })
    .join("");
  container.innerHTML = displayData;
};

const productsFilter = (company) => {
  const filterData = data.filter((product) => {
    if (product.fields.company === company) {
      return product;
    } else if (company === "all") {
      return product;
    }
  });
  return filterData;
};