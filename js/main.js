function AddCard(title, price, rating, image, className, label, add, alt) {
    let list = document.getElementById("products--js");
    let article = document.createElement("article");
    article.innerHTML = 
      `<img
        src="${image}"
        alt="${alt}"
        class="product__img"
        width="150"
        height="150"
        loading="lazy"
      />
      <h2 class="product__price" id="buzz-price">$${price}</h2>
      <h3 class="product__title" id="buzz-title">${title}</h3>
      <p class="product__rating" aria-label="Five star rating">${rating}</p>
      <button class="product__button" type="button">${add}</button>
      <button class="product__remove-button" type="button" aria-label="Remove Buzz Lightyear from cart" title="Remove from cart">×</button>`;
      article.className = className;
      article.tabIndex = 0;
      article.setAttribute("aria-labelledby", label);
    list.appendChild(article);
}

async function GetData() {
    const response = await fetch("js/index.json");
    const data = await response.json();
    for (let i = 0; i < data.Cards.length; i++) {
        AddCard(data.Cards[i].title, data.Cards[i].price, data.Cards[i].rating, data.Cards[i].image, data.Cards[i].className, data.Cards[i].label, data.Cards[i].add, data.Cards[i].alt);
}}
GetData();

(() => {
  const cartCountEl = document.getElementById('cart-count');
  let cartCount = 0;
  // Update cart count visually and aria-label
  function updateCartCount() {
    cartCountEl.textContent = cartCount;
    const cart = document.querySelector('.cart');
    cart.setAttribute('aria-label', `Shopping cart with ${cartCount} item${cartCount !== 1 ? 's' : ''}`);
  }
  // Show alert for adding product
  function showAddedAlert(productName) {
    alert(`Product "${productName}" is toegevoegd aan het winkelmandje.`);
  }
  // Add to cart button click handler
  function onAddToCartClick(event) {
    const product = event.target.closest('.product');
    if (!product || product.classList.contains('product--not-available')) return;
    const titleEl = product.querySelector('.product__title');
    const productName = titleEl ? titleEl.textContent.trim() : 'Product';
    cartCount++;
    updateCartCount();
    showAddedAlert(productName);
  }
  // Remove from cart button click handler
  function onRemoveFromCartClick(event) {
    if (cartCount === 0) return;
    cartCount--;
    updateCartCount();
  }
  // Attach event listeners
  const productContainer = document.getElementById('products--js');

productContainer.addEventListener('click', (event) => {
  if (event.target.classList.contains('product__button')) {
    onAddToCartClick(event);
  } else if (event.target.classList.contains('product__remove-button')) {
    onRemoveFromCartClick(event);
  }
});
  // Initialize cart count display
  updateCartCount();
})();

