// preloader
const preloader = document.querySelector('.preloader');

window.addEventListener('load', function () {
  preloader.classList.add('hide-preloader');
});

const formatPrice = (investment) => {
  const formattedPrice = new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
  }).format(investment.toFixed(2));
  return formattedPrice;
};



const params2 = window.location.search;
const urlID = new URLSearchParams(params2).get('id');