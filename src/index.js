import './style.scss';
import menuTemplate from './templates/menu';
import headerTemplate from './templates/header';
import basketTemplate from './templates/basket';
import menu from '../assets/data/menuData.json';
import restaurant from '../assets/data/restoranData.json';

renderMenu();
renderHeader();
addToBasket();
basketShow();
removeToBasket();
updatedToBasket();

function renderHeader() {
  const restaurantInfo = document.getElementById('restaurant-info');
  const restaurantTitle = document.getElementById('restaurant-title');
  restaurantTitle.innerHTML = restaurant.d.ResultSet.DisplayName;
  restaurantInfo.innerHTML = headerTemplate(restaurant.d.ResultSet);
}

function renderMenu() {
  const menuWrapper = document.getElementById('menu');
  const menuItems = menu.d.ResultSet.map((item) => {
    return menuTemplate(item);
  }).join('\n ');
  menuWrapper.innerHTML = menuItems;
}

function addToBasket() {
  let btn = document.querySelectorAll('.js-add-to-basket');
  const basketList = document.getElementById('basket-list');
  btn.forEach((el) =>
    el.addEventListener('click', (e) => {
      const id = e.target.getAttribute('data-pk');
      const quantity = parseInt(
        e.target.parentElement.querySelector('input').value
      );
      const price = parseFloat(
        e.target.getAttribute('data-price').replace(',', '.')
      ).toFixed(2);
      const total = parseFloat(price * quantity).toFixed(2);
      let local = JSON.parse(localStorage.getItem('basket')) || [];
      if (local.find((p) => p.id === id)) {
        local.forEach((item, i) => {
          if (item.id === id) {
            local[i].quantity = parseInt(local[i].quantity + quantity);
            local[i].totalPrice = parseFloat(local[i].quantity * price).toFixed(
              2
            );
          }
        });
      } else {
        let product = {
          title: e.target.getAttribute('data-title'),
          id: id,
          quantity: quantity,
          price: price,
          totalPrice: total,
        };
        local.push(product);
      }
      basketList.innerHTML = basketTemplate(local);
      basketTotalPrice(local);
      document.getElementById('basket-empty').classList.add('d-none');
      document.getElementById('basket-total').classList.remove('d-none');
      localStorage.setItem('basket', JSON.stringify(local));
    })
  );
}

function updatedToBasket() {
  let wrap = document.getElementById('basket-list');
  wrap.addEventListener('change', (e) => {
    if (e.target.classList.contains('js-basket-count')) {
      const quantity = parseInt(e.target.value);
      const id = e.target.parentElement
        .querySelector('.js-remove-product')
        .getAttribute('data-pk');
      let local = JSON.parse(localStorage.getItem('basket'));
      if (local.find((p) => p.id === id)) {
        local.forEach((item, i) => {
          if (item.id === id) {
            local[i].quantity = quantity;
            local[i].totalPrice = parseFloat(quantity * local[i].price).toFixed(
              2
            );
          }
        });
        localStorage.setItem('basket', JSON.stringify(local));
        basketShow();
        basketTotalPrice(local);
      }
    }
  });
}

function removeToBasket() {
  let wrap = document.getElementById('basket-list');
  wrap.addEventListener('click', (e) => {
    if (e.target.classList.contains('js-remove-product')) {
      const id = e.target.getAttribute('data-pk');
      let local = JSON.parse(localStorage.getItem('basket'));
      local = local.filter((item) => item.id !== id);
      localStorage.setItem('basket', JSON.stringify(local));
      basketShow();
      basketTotalPrice(local);
    }
  });
}

function basketShow() {
  let local = JSON.parse(localStorage.getItem('basket')) || [];
  document.getElementById('basket-list').innerHTML = basketTemplate(local);
  basketTotalPrice(local);
  if (local.length) {
    document.getElementById('basket-empty').classList.add('d-none');
    document.getElementById('basket-total').classList.remove('d-none');
  } else {
    document.getElementById('basket-empty').classList.remove('d-none');
    document.getElementById('basket-total').classList.add('d-none');
  }
}

function basketTotalPrice(products) {
  const total = products.reduce((acc, c) => acc + parseFloat(c.totalPrice), 0);
  document.querySelectorAll('.js-basket-total')[0].innerHTML = `${parseFloat(
    total
  ).toFixed(2)} TL`;
}
