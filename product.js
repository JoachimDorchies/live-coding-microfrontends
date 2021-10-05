class Products extends HTMLElement {
  products = [
    {
      id: 1,
      name: "Item A",
      price: 25,
    },
    {
      id: 2,
      name: "Item B",
      price: 30,
    },
    {
      id: 3,
      name: "Item C",
      price: 99,
    },
  ];

  constructor() {
    super();
  }

  connectedCallback() {
    this.addOne = this.addOne.bind(this);
    this.removeOne = this.removeOne.bind(this);

    this.render();
    this.addEvents();
  }

  addEvents() {
    for (let item of this.getElementsByClassName("product__remove")) {
      item.addEventListener("click", this.removeOne);
    }

    for (let item of this.getElementsByClassName("product__add")) {
      item.addEventListener("click", this.addOne);
    }
  }

  addOne(event) {
    const id = event.target.dataset.id;

    window.dispatchEvent(
      new CustomEvent("product:add", {
        detail: this.products.find((product) => product.id == id),
      })
    );
  }

  removeOne(event) {
    const id = event.target.dataset.id;

    window.dispatchEvent(
      new CustomEvent("product:remove", {
        detail: this.products.find((product) => product.id == id),
      })
    );
  }

  render() {
    this.innerHTML = this.products
      .map((product) => {
        return `
          <div class="product">
            <div class="product__infos">
              <span class="product__title">${product.name}</span>
              <span class="product__price">${product.price}€</span>
            </div>
            <div class="product__actions">
              <button data-id="${product.id}" class="product__remove">Remove one</button>
              <button data-id="${product.id}" class="product__add">Add one</button>
            </div>
          </div>
        `;
      })
      .reduce((acc, curr) => {
        return acc + curr;
      }, "");
  }
}

window.customElements.define("my-products", Products);
