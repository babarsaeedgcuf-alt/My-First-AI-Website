const modeButtons = document.querySelectorAll('[data-mode]');
const screens = document.querySelectorAll('.screen');
const buyerNav = document.querySelector('.buyer-nav');
const sellerNav = document.querySelector('.seller-nav');
const title = document.querySelector('#app-title');
const subtitle = document.querySelector('#app-subtitle');
const toast = document.querySelector('.toast');
let toastTimer;

function showToast(message) {
  toast.textContent = message;
  toast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('show'), 2200);
}

function showScreen(name) {
  screens.forEach((screen) => screen.classList.toggle('active', screen.dataset.screen === name));
  document.querySelectorAll('.bottom-nav button[data-target]').forEach((button) => {
    button.classList.toggle('active', button.dataset.target === name);
  });
}

modeButtons.forEach((button) => button.addEventListener('click', () => {
  const seller = button.dataset.mode === 'seller';
  modeButtons.forEach((item) => item.classList.toggle('active', item === button));
  buyerNav.hidden = seller;
  sellerNav.hidden = !seller;
  title.textContent = seller ? 'میرا کاروبار' : 'کپڑا منڈی';
  subtitle.textContent = seller ? 'تاجر ڈیش بورڈ' : 'فیصل آباد';
  showScreen(seller ? 'seller-home' : 'buyer-home');
  if (window.applyKapraLanguage) window.applyKapraLanguage();
}));

document.querySelectorAll('[data-target], [data-go]').forEach((button) => {
  button.addEventListener('click', () => showScreen(button.dataset.target || button.dataset.go));
});

document.querySelectorAll('[data-toast]').forEach((button) => {
  button.addEventListener('click', () => showToast(button.dataset.toast));
});

const search = document.querySelector('#fabric-search');
const products = [...document.querySelectorAll('.product')];
const resultCount = document.querySelector('#result-count');
const urduNumbers = ['۰', '۱', '۲', '۳'];

function filterProducts(term) {
  let visible = 0;
  products.forEach((product) => {
    const match = product.dataset.name.includes(term.trim());
    product.hidden = !match;
    if (match) visible += 1;
  });
  resultCount.textContent = `${urduNumbers[visible]} اشیاء`;
}

search.addEventListener('input', () => filterProducts(search.value));
document.querySelectorAll('[data-filter]').forEach((button) => button.addEventListener('click', () => {
  search.value = button.dataset.filter;
  filterProducts(button.dataset.filter);
}));

const hearts = document.querySelectorAll('.heart');
const savedCount = document.querySelector('#saved-count');
hearts.forEach((heart) => heart.addEventListener('click', () => {
  heart.classList.toggle('saved');
  heart.setAttribute('aria-label', heart.classList.contains('saved') ? 'محفوظ کردہ' : 'محفوظ کریں');
  const count = document.querySelectorAll('.heart.saved').length;
  savedCount.textContent = urduNumbers[count];
  showToast(heart.classList.contains('saved') ? 'پسندیدہ اشیاء میں شامل ہوگیا' : 'پسندیدہ اشیاء سے ہٹا دیا گیا');
}));

const listingCount = document.querySelector('#listing-count');
document.querySelector('#add-listing').addEventListener('click', () => {
  listingCount.textContent = '۲۹';
  showToast('نمونہ لسٹنگ کامیابی سے شامل ہوگئی');
});
document.querySelector('#stock-button').addEventListener('click', () => showToast('اسٹاک شامل کرنے کا فارم کھل گیا'));
