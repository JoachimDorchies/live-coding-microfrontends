class Cart extends HTMLElement {
  products = [];

  constructor() {
    super();
  }

  connectedCallback() {
    this.refresh = this.refresh.bind(this);
    this.addProduct = this.addProduct.bind(this);
    this.removeProduct = this.removeProduct.bind(this);
    this.priceElements = this.priceElements.bind(this);

    this.render();
    window.addEventListener("product:add", this.addProduct);
    window.addEventListener("product:remove", this.removeProduct);
  }

  addProduct(event) {
    const product = event.detail;

    const productFound = this.products.find(
      (productTmp) => productTmp.id === product.id
    );

    if (productFound) {
      this.products = this.products.filter(
        (productTmp) => productTmp.id !== product.id
      );

      this.products.push({ ...product, quantity: productFound.quantity + 1 });
    } else {
      this.products.push({ ...product, quantity: 1 });
    }

    this.refresh();
  }

  removeProduct(event) {
    const product = event.detail;

    const productFound = this.products.find(
      (productTmp) => productTmp.id === product.id
    );

    if (productFound) {
      this.products = this.products.filter(
        (productTmp) => productTmp.id !== product.id
      );

      this.products.push({
        ...productFound,
        quantity: productFound.quantity - 1,
      });

      this.products = this.products.filter(
        (productTmp) => productTmp.quantity > 0
      );
    }

    this.refresh();
  }

  priceElements() {
    return this.products.reduce((acc, curr) => {
      return acc + curr.price * curr.quantity;
    }, 0);
  }

  countElements() {
    return this.products.reduce((acc, curr) => {
      return acc + curr.quantity;
    }, 0);
  }

  refresh() {
    this.render();
  }

  render() {
    this.innerHTML = `
        <div class="cart">
            <div class="cart__infos">${this.priceElements()}€ (${this.countElements()} elements)</div>
        </div>
    `;
  }
}

window.customElements.define("my-cart", Cart);
