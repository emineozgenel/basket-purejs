export default function(baskets) {
  return baskets.map(basket => `
    <div class="d-flex align-items-center justify-content-between">
      <p class="basket-items__content-title">${basket.title}</p>
      <input class="basket-items__content-count input js-basket-count" type="number" min="1" data-price="${basket.price}" name="basket-count" value="${basket.quantity}">
      <p class="basket-items__content-price">${basket.totalPrice} TL</p>
      <p class="basket-items__content-remove js-remove-product" data-pk="${basket.id}">X</p>
    </div>
  `).join('\n      ');
}