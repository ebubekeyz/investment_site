// preloader
const preloader = document.querySelector('.preloader');

window.addEventListener('load', function () {
  preloader.classList.add('hide-preloader');
});

const formatPrice = (investment) => {
    const formattedPrice = new Intl.NumberFormat('en-NG', {
        style: 'currency',
        currency: 'NGN',
    }).format((investment).toFixed(2))
    return formattedPrice
  }

const chevronDOM = document.querySelector('.chevron')

chevronDOM.addEventListener('click',() => {
    window.history.back()
})

const accountInput = document.querySelector('.realname')

window.addEventListener('DOMContentLoaded',() => {
    try
})


