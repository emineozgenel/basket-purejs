export default function(menu) {
  return `
    <div class="menu__items">
      <h3>${menu.DisplayName}</h3>
      ${menu.Products.map(product => `
        <div class="menu-item d-flex">
          <div class="menu-item__count d-flex">
            <input type="number" class="input" data-pk="100" value="1" min="1" max="20">
            <button data-pk="${product.ProductId}" data-title="${product.DisplayName}" data-price="${product.ListPrice}" class="btn btn--primary btn--small js-add-to-basket">+</button>
          </div>
          <div class="menu-item__info">
            <h4 class="text-orange">${product.DisplayName}</h4>
            <p>${product.Description}</p>
          </div>
          <div class="menu-item__price text-orange"><span>${product.ListPrice}</span>TL</div>
        </div>
      `).join('\n  ')}
    </div>
  `;
}