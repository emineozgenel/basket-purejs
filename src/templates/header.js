export default function(restaurant) {
  return `
    <ul class="detail-header__points d-flex">
      <li>
        <span>Hız</span>
        <span id="speed" class="point">${restaurant.Speed}</span>
      </li>
      <li>
        <span>Servis</span>
        <span id="serving" class="point">${restaurant.Serving}</span>
      </li>
      <li>
        <span>Lezzet</span>
        <span id="flavour" class="point">${restaurant.Flavour}</span>
      </li>
    </ul>
    <ul class="detail-header__other d-flex">
      <li>
        <span class="title"> Min. Tutar</span>
        <p><strong id="min-total">${restaurant.DeliveryFee} TL</strong></p>
      </li>
      <li>
        <span class="title">Servis Süresi</span>
        <p><strong id="time">${restaurant.DeliveryTime} dk.</strong></p>
      </li>
    </ul>
  `;
}